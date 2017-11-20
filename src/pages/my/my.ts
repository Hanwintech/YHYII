import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, AlertController, ToastController } from 'ionic-angular';
import { Platform, ActionSheetController, LoadingController } from 'ionic-angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Network } from '@ionic-native/network';
import { SqlService } from "../../services/sqlite.service";
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { File } from '@ionic-native/file';
import { GlobalCache } from './../../services/globalCache.service';
import { ApiService } from "./../../services/api.service";
import { InspectService } from './../../services/inspect.service';
import { Http, Headers, RequestMethod, Request } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Observable } from "rxjs";
@IonicPage()
@Component({
  selector: 'page-my',
  templateUrl: 'my.html',
})
export class MyPage {
  area;
  scenery;
  building;
  json;
  role;
  both;
  isConnected;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private app: App,
    private alertCtrl: AlertController,
    public platform: Platform,
    private network: Network,
    private sqlService: SqlService,
    private apiService: ApiService,
    public sqlite: SQLite,
    private file: File,
    public transfer: FileTransfer,
    private inspectService: InspectService,
    private storage: Storage,
    private globalCache: GlobalCache,
    private loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public actionSheetCtrl: ActionSheetController) {
  }
  exitMenu() {
    let that=this;
    let actionSheet = this.actionSheetCtrl.create({
      title: '请确保您的数据已上传，若退出系统，则您在此工作机上存储的数据将被清空！',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: '确认',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'checkmark' : null,
          handler: () => {
            that.sqlService.deleteData('delete from BuildingInfo').subscribe(res => {
            });
            that.sqlService.deleteData('drop table DiseaseRecord').subscribe(res => {
     
            });
            that.app.getRootNav().setRoot("LoginPage", { logout: true });
          }
        }, {
          text: '取消',
          role: 'cancel',
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
          }
        }
      ]
    });
    actionSheet.present();
  }
  ionViewDidEnter() {
    this.getTestWifi();
    this.storage.ready().then(() => {
      this.globalCache.init(() => {
        let user = this.globalCache.user;
        this.role = this.globalCache.user.role;
        if (this.role == "") {
          let alert = this.alertCtrl.create({ title: '提示', subTitle: '该账号并无查看数据的权限，请登录正确的账号！', buttons: ['确定'] });
          alert.present();
        }
        if (this.role.length > 1) {
          this.both = true;
        }
      });
    });
    this.getBasicData();
  }

  //台账数据上传
  uploadBuildingData() {
    let that=this;
    if (this.isConnected) {
      let loading = this.loadingCtrl.create({ dismissOnPageChange: true, content: '正在上传台账数据' });
      loading.present();
      this.sqlService.getSelectData('select * from BuildingInfo where status=1').subscribe((res) => {
          if(res.length>0){
            let tempData = { "saveList": res };
            this.inspectService.saveListAncientArchitecture(tempData).subscribe((res) => {
              loading.dismiss();
              if (res.code = "10000") {
                let jsonData = {
                  "data": {
                    "updates": {
                      "BuildingInfo": [
                        {
                          "set": { "status": 2 },
                          "where":{"status":1}
                        }
                      ],
                    }
                  }
                };
                this.sqlService.initialData(jsonData).subscribe((res) => {
                  if (res) {
                    let alert = that.alertCtrl.create({ title: '提示', subTitle: '数据已上传成功!', buttons: ['确定'] });
                    alert.present();
                  }
                }, (error) => { });
              }
            }, (error) => { loading.dismiss(); });
          }
          else{
            let alert = this.alertCtrl.create({ title: '警告！', subTitle: '您本地并无更改数据', buttons: ['确定'] });
            alert.present();
            loading.dismiss();
          }
      }, (error) => { loading.dismiss(); });
    }
    else {
      let alert = this.alertCtrl.create({ title: '警告！', subTitle: '请在有网络的情况下，进行数据操作！', buttons: ['确定'] });
      alert.present();
    }
  }
  //台账数据下载
  getBuildingData() {
    if (this.isConnected) {
      let that = this;
      let loading = that.loadingCtrl.create({ dismissOnPageChange: true, content: '正在下载台账数据' });
      this.sqlService.getSelectData("select * from BuildingInfo where status=1").subscribe(res => {
        console.log(res);
        if (res.length > 0) {
          let alert = this.alertCtrl.create({
            title: '提示',
            message: '您下载的服务器数据将会覆盖本地的数据，是否继续？',
            buttons: [
              {
                text: '取消',
                handler: () => {
                  return;
                }
              },
              {
                text: '继续',
                handler: () => {
                  this.deleteBuildingData();
                  loading.present();
                  this.insertBuildingData().then(function (data) {
                    loading.dismiss();
                    if (data) {
                      let toast = that.toastCtrl.create({
                        message: '数据下载成功！',
                        cssClass: 'background:#ddd;',
                        duration: 1000
                      });
                      toast.present();
                    }
                  }).catch(function (reject) {
                    loading.dismiss();
                    let alert = that.alertCtrl.create({ title: '警告！', subTitle: '由于网络原因，台账数据下载失败，请待会儿重试', buttons: ['确定'] });
                    alert.present();
                  });
                }
              }
            ]
          });
          alert.present();
        }
        else {
          loading.present();
          this.insertBuildingData().then(function (data) {
            loading.dismiss();
            if (data) {
              let toast = that.toastCtrl.create({
                message: '数据下载成功！',
                cssClass: 'background:#ddd;',
                duration: 1000
              });
              toast.present();
            }
          }).catch(function (reject) {
            loading.dismiss();
            let alert = that.alertCtrl.create({ title: '警告！', subTitle: '由于网络原因，台账数据下载失败，请待会儿重试', buttons: ['确定'] });
            alert.present();
          });
        }
      }, (error) => {
        let alert = that.alertCtrl.create({ title: '警告！', subTitle: '由于网络原因，台账数据下载失败，请待会儿重试', buttons: ['确定'] });
        alert.present();
      });
    }
    else {
      let alert = this.alertCtrl.create({ title: '警告！', subTitle: '请在有网络的情况下，进行数据传输操作！', buttons: ['确定'] });
      alert.present();
    }
  }
  private insertBuildingData() {
    let that = this;
    let p = new Promise(function (resolve, reject) {
      that.inspectService.getListAncientArchitecture().subscribe((res) => {
        if (res.code == "10000") {
          let tempBuildingjson = {
            "structure": {
              "tables": {
                "BuildingInfo": `(basicDataId,ancientNumber,ancientArea,ancientName,ancientBelong,structureType,buildingFunction,buildingStyle,constructionTime,finalRepair,planeForm,basicShapesLouti,basicShapesBaosha,basicShapesQianlang,basicShapeszhouweilang,basicShapesHoulang,miankuo,throughSurface,depth,depthofM,baseMaterial,baseForm,platformSize,groundMaterial,groundPractice,platformWheather,tailgateWheather,tailgateNumber,stepsWheather,stepsNumber,drumStone,drumStoneNumber,materialScience,wallmethod,lowerMethod,beamFrame,beamForm,eavesColumnDiameter,numberOfCanopies,underBrackets,underBucketSize,underBucketRemark,underCornerSection,underNumberOfStigma,underFamilies,upperBrackets,upperBucketSize,upperBucketRemark,upperCornerSection,upperNumberOfStigma,upperFamilies,curtainFrameWheather,paneMaterial,windDoorWheather,windowSillMaterial,windowWindowWheather,windowShape,eavesBetweenWheather,daoGuaMeizi,zuoDengMeizi,ceilingWheather,lowerFrame,frameColorWheather,frameColorType,doorPaintWheather,doorPaintColorType,roofRorm,tileType,glazedColor,cutEdgeColor,kissAnimalWheather,beastWheather,beastNumber,otherComponent,eavesHeight,positiveHeight,otherDescript,problemDescription,modifyTime,status INTEGER)`
              }
            },
            "data": {
              "inserts": {
                "BuildingInfo": res.data,
              }
            }
          };
          that.sqlService.initialData(tempBuildingjson).subscribe((res) => {
            if (res) {
              resolve(res);
            }
            else {
              reject(res);
            }
            // that.sqlService.getSelectData("select * from BuildingInfo").subscribe(res => {
            //   console.log(res);
            // }, (error) => {
            //   console.log(error);
            // });
          }, (error) => {
            reject(res);
          });
        }
        else {
          reject("数据获取失败!");
        }
      }, error => { });
    })
    return p;
  }
  //巡检数据获取
  getInspectData() {
    if (this.isConnected) {
      this.sqlService.getSelectData('select * from DiseaseRecord where status="1"').subscribe(res => {
        if (res.length > 0) {
          let alert = this.alertCtrl.create({
            title: '警告',
            message: '您本地存在未上传的巡检数据，如若继续下载,则会覆盖本地数据！',
            buttons: [
              {
                text: '取消',
                handler: () => {
                  return;
                }
              },
              {
                text: '继续下载',
                handler: () => {
                  this.deleteInspectData();
                  this.isGetInspectData();
                }
              }
            ]
          });
          alert.present();
        }
        else {
          this.isGetInspectData();
        }
      }, error => {
      });
    }
    else {
      let alert = this.alertCtrl.create({ title: '警告！', subTitle: '请在有网络的情况下，进行数据传输操作！', buttons: ['确定'] });
      alert.present();
    }

  }
  private isGetInspectData() {
    let that = this;
    let loading = this.loadingCtrl.create({ dismissOnPageChange: true, content: '正在下载巡检数据' });
    loading.present();
    this.inspectService.getDiseaseRecord().subscribe((res) => {
      loading.dismiss();
      let inspectData = {
        "structure": {
          "tables": {
            "DiseaseRecord": "(ancientArcID,diseaseLevel,inspectDescription,inspectPerson,inspectTime,inspectionPositionID,isRepaired,location,picUrl,recordId,repairDescription,respairTime,status,workType)"
          }
        },
        "data": {
          "inserts": {
            "DiseaseRecord": JSON.parse(res.data)
          }
        }
      }

      this.sqlService.initialData(inspectData).subscribe((res) => {
        this.downLoadFile().then(function () {      
          let toast = that.toastCtrl.create({
            message: '数据下载成功！',
            cssClass: 'background:#ddd;',
            duration: 1000
          });
          toast.present();
        });
      }, (error) => { });
    }, (error) => { loading.dismiss();});
  }
  // 巡检数据上传
  uploadInspectData() {
    let loading = this.loadingCtrl.create({ dismissOnPageChange: true, content: '正在上传巡检数据' });
    loading.present();
    let that = this;
    if (this.isConnected) {
      this.uploadFile().subscribe(res => {
        if (!res) {
          alert("上传附件失败");
        }
      }, error => {
        loading.dismiss();
      });
      this.sqlService.getSelectData('select * from DiseaseRecord where status="1"').subscribe((res) => {
        if (res.length > 0) {
          let tempRecordData = { "listDisInsRecord": res };
          this.inspectService.getSaveInspect(tempRecordData).subscribe((res) => {
            loading.dismiss();
            if (res.code = "10000") {
              let jsonData = {
                "data": {
                  "updates": {
                    "DiseaseRecord": [
                      {
                        "set": { "status": "0" },
                      }
                    ],
                  }
                }
              };
              this.sqlService.initialData(jsonData).subscribe((res) => {
                if (res) {
                  let alert = that.alertCtrl.create({ title: '提示', subTitle: '数据已上传成功!', buttons: ['确定'] });
                  alert.present();
                  // this.sqlService.getSelectData("select * from DiseaseRecord").subscribe((res)=>{
                  //   console.log(res);
                  // });
                }
              }, (error) => { });

            }
            else {
              let alert = this.alertCtrl.create({ title: '警告！', subTitle: '数据上传失败，请重新操作！', buttons: ['确定'] });
              alert.present();
            }
          }, (error) => {
            loading.dismiss();
            let alert = this.alertCtrl.create({ title: '警告！', subTitle: '数据上传失败，请重新操作！', buttons: ['确定'] });
            alert.present();
          });
        }
        else {
          let alert = this.alertCtrl.create({ title: '警告！', subTitle: '您本地并无更改数据', buttons: ['确定'] });
          alert.present();
          loading.dismiss();
        }
      }, (error) => {
        let alert = this.alertCtrl.create({ title: '警告！', subTitle: '出现异常，请稍后操作', buttons: ['确定'] });
        alert.present();
      });
    }
    else {
      loading.dismiss();
      let alert = this.alertCtrl.create({ title: '警告！', subTitle: '请在有网络的情况下，进行数据传输操作！', buttons: ['确定'] });
      alert.present();
    }
  }



  getDiseaseData(selectStr: string): Observable<string> {
    return Observable.create(observer => {
      this.sqlite.create({
        name: "data.db",
        location: "default"
      }).then((db: SQLiteObject) => {
        db.executeSql(selectStr, {}).then((rs) => {
          if (rs.rows.length > 0) {
            for (var i = 0; i < rs.rows.length; i++) {
              var item = rs.rows.item(i);
              this.inspectService.getSaveInspect(item).subscribe(res => {
              }, error => { console.log(error); });
            }
            observer.next(true);
          }
          else {
            observer.next(false);
          }
        }, (error) => {
          observer.next(error);
        })
      });
    });
  }
  //根据图片名称上传所有图片
  private uploadFile(): Observable<boolean> {
    return Observable.create(observer => {
      this.getPicName().subscribe(res => {
        for (let i = 0; i < res.length; i++) {
          let tempPic = res[i];
          this.uploadSingleFile(tempPic).subscribe(res => {
            //this.removeSingleFile(tempPic);
            observer.next(true);
          }, error => {
            observer.next(false);
          });
        }
      }, error => {
        observer.next(false);
      });
    });
  }
  //图片上传（单张上传）
  private uploadSingleFile(uploadImg): Observable<boolean> {
    return Observable.create(res => {
      const fileTransfer: FileTransferObject = this.transfer.create();
      let options: FileUploadOptions = {
        fileKey: 'file',
        fileName: uploadImg,
      }
      fileTransfer.upload(this.file.externalRootDirectory + 'com.hanwintech.yhyii/' + uploadImg,
        encodeURI(this.apiService.baseUrl + '/api/Inspect/SaveTempFile'),
        options, true).then((data) => {
          console.log("图片上传");
          console.log(this.file.externalRootDirectory + 'com.hanwintech.yhyii/' + uploadImg);
          res.next(true);
        }, (err) => {
          res.next(false);
        })
    }, error => { });

  }
  //获取所有record中图片名称
  private getPicName(): Observable<Array<string>> {
    return Observable.create(observer => {
      let imgData;
      let imgName = [];
      this.sqlService.getSelectData('select * from DiseaseRecord where status="1"').subscribe(res => {
        imgData = res;
        for (let i = 0; i < imgData.length; i++) {
          if (imgData[i].picUrl != "") {
            imgName.push(imgData[i].picUrl);
          }
        }
        observer.next(imgName.join(",").split(","));
      }, (error) => {
        observer.next(false);
      });
    });
  }
  getBasicData() {
    this.inspectService.wifiTest().subscribe(res => {
      this.isConnected = true;
      this.inspectService.getDiseaseInspection().subscribe((res) => {
        console.log("页面初次加载时候的总数据");
        if (res.code == "10000") {
          this.json = {
            "structure": {
              "tables": {
                "Area": "(Description,ID integer,Name)",
                "Scenery": "(Description,ID,InspectAreaID,Name,XOrder)",
                "DisInspectPosition": "(ID,PID,PositionName,Type,XOrder)",
                "AncientArchitecture": "(ID,Name,SceneryName)"
              }
            },
            "data": {
              "inserts": {
                "Area": JSON.parse(res.data[0]),
                "Scenery": JSON.parse(res.data[1]),
                "DisInspectPosition": JSON.parse(res.data[2]),
                "AncientArchitecture": JSON.parse(res.data[3])
              }
            }
          };
          this.sqlService.initialData(this.json).subscribe((res) => {
            if (!res) {
              let alert = this.alertCtrl.create({ title: '警告！', subTitle: '数据初始化失败，请重新登录！', buttons: ['确定'] });
              alert.present();
            }
          }, (error) => { });
        }
        else {
          let alert = this.alertCtrl.create({ title: '警告！', subTitle: '数据初始化失败，请重新登录！', buttons: ['确定'] });
          alert.present();
        }
      }, (error) => { });
    }, error => {
      if (error.status == 0) {
        let alert = this.alertCtrl.create({ title: '警告！', subTitle: '请在有网络的情况下，进行数据传输操作，若此时有网，您可以切换菜单，重新进入该页面。', buttons: ['确定'] });
        alert.present();
      }
    });
  }
  private download(url, imgName) {
    const fileTransfer: FileTransferObject = this.transfer.create();
    let options: FileUploadOptions = {
    }
    fileTransfer.download(url, this.file.externalRootDirectory + 'com.hanwintech.yhyii/' + imgName).then((entry) => {

    }, (error) => {
      console.log(error);
    });

  }

  downLoadFile() {
    var that = this;
    let p = new Promise(function (resolve, reject) {
      that.file.createDir(that.file.externalRootDirectory, 'com.hanwintech.yhyii', true).then(_ => {
        console.log("下载图片");
        that.inspectService.getFiles().subscribe((res) => {
          for (let i = 0; i < res.data.length; i++) {
            let tempPicUrl = that.apiService.getPicUrl(res.data[i]);
            let tempPicName = res.data[i].split("/").pop();
            that.download(tempPicUrl, tempPicName);
          }
          resolve(true);
        }, (error) => {
          console.log(error);
        });
      }).catch(err => console.log(err));
    });
    return p;
  }

  // private removeSingleFile(picName) {
  //   this.file.removeFile(this.file.externalRootDirectory + 'com.hanwintech.yhyii', picName).then(res => {
  //   }).catch(err => { console.log("删除附件失败"); console.log(err); });
  // }
  deleteBuildingData() {
    this.sqlService.deleteData('delete from BuildingInfo').subscribe(res => {
      console.log(res);
    });
  }
  deleteInspectData() {
    this.sqlService.deleteData('delete from DiseaseRecord').subscribe(res => {
      console.log(res);
    });
  }
  deleteDataInfo() {
    this.sqlService.deleteData('delete from DiseaseRecord').subscribe(res => {
      console.log(res);
    });
  }

  private getTestWifi() {
    this.inspectService.wifiTest().subscribe(res => {
      this.isConnected = true;
    }, error => {
      if (error.status == 0) {
        this.isConnected = false;
      }
    });
  }

}


