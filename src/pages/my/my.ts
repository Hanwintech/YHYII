import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, AlertController } from 'ionic-angular';
import { Platform, ActionSheetController } from 'ionic-angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Network } from '@ionic-native/network';
import { SqlService } from "../../services/sqlite.service";
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { File } from '@ionic-native/file';
import { GlobalCache } from './../../services/globalCache.service';
import { ApiService } from "./../../services/api.service";
import { InspectService } from './../../services/inspect.service';
import { Http, Headers, RequestMethod, Request } from '@angular/http';
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
    private globalCache: GlobalCache,
    public actionSheetCtrl: ActionSheetController) {
  }

  exitMenu() {
    let actionSheet = this.actionSheetCtrl.create({
      title: '确定要退出登录吗？',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: '确认',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'checkmark' : null,
          handler: () => {
            this.app.getRootNav().setRoot("LoginPage", { logout: true });
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

  }

  //台账数据上传
  uploadBuildingData() {
    this.sqlService.getSelectData('select * from BuildingInfo where status="1"').subscribe((res) => {
      let tempData = { "saveList": res };
      this.inspectService.saveListAncientArchitecture(tempData).subscribe((res) => {
        console.log("上传数据");
        console.log(res);
        this.deleteBuildingData();
      }, (error) => { });
    }, (error) => { });
  }
  //台账数据下载
  getBuildingData() {
    this.inspectService.getListAncientArchitecture().subscribe((res) => {
      console.log(res);
      this.json = {
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
      this.sqlService.initialData(this.json).subscribe((res) => {
        this.sqlService.getSelectData("select * from BuildingInfo").subscribe(res => {
          console.log(res);
        }, (error) => {
          console.log(error);
        });
      }, (error) => { });

    }, error => { });


  }


  //巡检数据获取
  getInspectData() {
    this.sqlService.getSelectData('select * from DiseaseRecord').subscribe(res => {
      console.log("巡检记录表")
      console.log(res);
      if (res) {
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
  //下载巡检数据
  private isGetInspectData() {
    this.inspectService.getDiseaseRecord().subscribe((res) => {
      let inspectData = {
        "structure": {
          "tables": {
            "DiseaseRecord": "(ancientArcID,diseaseLevel,inspectDescription,inspectPerson,inspectTime,inspectionPositionID,isRepaired,location,picUrl,recordId,repairDescription,respairTime,workType)"
          }
        },
        "data": {
          "inserts": {
            "DiseaseRecord": JSON.parse(res.data)
          }
        }
      }
      this.sqlService.initialData(inspectData).subscribe((res) => {
        console.log(res);
        this.downLoadFile();
        this.sqlService.getSelectData("select * from DiseaseRecord").subscribe((res) => {
          console.log(res);
        });
      }, (error) => { });
    }, (error) => { });
  }
  // 巡检数据上传
  uploadInspectData() {
    this.uploadFile().subscribe(res => {
      if (!res) {
        alert("上传附件失败");
      }
    }, error => {
      console.log(error);
    });
    this.getDiseaseData('select * from DiseaseRecord').subscribe(res => {
      console.log(res);
      this.deleteInspectData();
    }, error => {

    });

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
                observer.next(res);
                console.log(res);
              }, error => { console.log(error); });
            }

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
            this.removeSingleFile(tempPic);
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
          console.log(err);
          res.next(false);
        })
    }, error => { });

  }
  //获取所有record中图片名称
  private getPicName(): Observable<Array<string>> {
    return Observable.create(observer => {
      let imgData;
      let imgName = [];
      this.sqlService.getSelectData('select * from DiseaseRecord').subscribe(res => {
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
    this.inspectService.getDiseaseInspection().subscribe((res) => {
      console.log(res);
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
      console.log(JSON.parse(res.data[0]));
      this.sqlService.initialData(this.json).subscribe((res) => {
        console.log(res);
      }, (error) => { });

    }, (error) => { });
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
    this.file.createDir(this.file.externalRootDirectory, 'com.hanwintech.yhyii', true).then(_ => {
      this.inspectService.getFiles().subscribe((res) => {
        for (let i = 0; i < res.data.length; i++) {
          let tempPicUrl = this.apiService.getPicUrl(res.data[i]);
          let tempPicName = res.data[i].split("/").pop();
          this.download(tempPicUrl, tempPicName);
        }
      }, (error) => {
        console.log(error);
      });
    }).catch(err => console.log('create fail'));

  }

  private removeSingleFile(picName) {
    this.file.removeFile(this.file.externalRootDirectory + 'com.hanwintech.yhyii', picName).then(res => {
    }).catch(err => { console.log("删除附件失败"); console.log(err); });
  }
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
  deleteDataInfo(){
    this.sqlService.deleteData('delete from DiseaseRecord').subscribe(res => {
      console.log(res);
    });
  }
}


