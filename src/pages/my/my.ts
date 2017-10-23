import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, AlertController } from 'ionic-angular';
import { Platform, ActionSheetController } from 'ionic-angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Network } from '@ionic-native/network';
import { SqlService } from "../../services/sqlite.service";
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { File } from '@ionic-native/file';

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
    public actionSheetCtrl: ActionSheetController) {
    //this.download();
    //this.getPicName();
    //this.removeFile('bjing0069');
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

  UploadsynchronousData() {

    this.sqlService.getSelectData('select * from BuildingInfo where status="1"').subscribe((res) => {
      let tempData = { "saveList": res};
      this.inspectService.saveListAncientArchitecture(tempData).subscribe((res) => {
        console.log("上传数据");
        console.log(res);
      }, (error) => { });
    }, (error) => { });


  }
  synchronousData() {
    this.inspectService.getListAncientArchitecture().subscribe((res) => {
      this.json = {
        "structure": {
          "tables": {
            "BuildingInfo": `(basicDataId,ancientNumber,ancientArea,ancientName,ancientBelong,structureType,buildingFunction,buildingStyle,constructionTime,finalRepair,planeForm,basicShapesLouti,basicShapesBaosha,basicShapesQianlang,basicShapeszhouweilang,basicShapesHoulang,miankuo,throughSurface,depth,depthofM,baseMaterial,baseForm,platformSize,groundMaterial,groundPractice,platformWheather,tailgateWheather,tailgateNumber,stepsWheather,stepsNumber,drumStone,drumStoneNumber,materialScience,wallmethod,lowerMethod,beamFrame,beamForm,eavesColumnDiameter,numberOfCanopies,underBrackets,underBucketSize,underBucketRemark,underCornerSection,underNumberOfStigma,underFamilies,upperBrackets,upperBucketSize,upperBucketRemark,upperCornerSection,upperNumberOfStigma,upperFamilies,curtainFrameWheather,paneMaterial,windDoorWheather,windowSillMaterial,windowWindowWheather,windowShape,eavesBetweenWheather,daoGuaMeizi,zuoDengMeizi,ceilingWheather,lowerFrame,frameColorWheather,frameColorType,doorPaintWheather,doorPaintColorType,roofRorm,tileType,glazedColor,cutEdgeColor,kissAnimalWheather,beastWheather,beastNumber,otherComponent,eavesHeight,positiveHeight,otherDescript,problemDescription,modifyTime,status)`
          }
        },
        "data": {
          "inserts": {
            "BuildingInfo": res.data,
          }
        }
      };
      this.sqlService.initialData(this.json).subscribe((res) => {
        console.log(res);
        this.sqlService.getSelectData("select * from BuildingInfo").subscribe(res => {
          console.log(res);
        }, (error) => {
          console.log(error);
        });
      }, (error) => { });

    }, error => { });


  }



  uploadData() {
    this.uploadFile().subscribe(res => {
      if (!res) {
        alert("上传附件失败");
      }
    }, error => {
      console.log(error);
    });
    this.getDiseaseData('select * from DiseaseRecord').subscribe(res => {
      ///console.log(res);
    }, error => {

    });

  }
  //上传图片
  uploadFile(): Observable<boolean> {
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

  uploadSingleFile(uploadImg): Observable<boolean> {
    return Observable.create(res => {
      const fileTransfer: FileTransferObject = this.transfer.create();
      let options: FileUploadOptions = {
        fileKey: 'file',
        fileName: uploadImg,
      }
      fileTransfer.upload(this.file.externalRootDirectory + 'com.hanwintech.yhyii/' + uploadImg,
        encodeURI(this.apiService.baseUrl + '/api/Inspect/SaveTempFile'),
        options, true).then((data) => {
          res.next(true);
        }, (err) => {
          console.log(err);
          res.next(false);
        })
    }, error => { });

  }
  getPicName(): Observable<Array<string>> {
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

  private download(url, imgName) {
    const fileTransfer: FileTransferObject = this.transfer.create();
    let options: FileUploadOptions = {
    }
    fileTransfer.download(url, this.file.externalRootDirectory + 'com.hanwintech.yhyii/' + imgName).then((entry) => {

    }, (error) => {
      console.log(error);
    });

  }

  downLoadTest() {
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
              item.picUrl = item.picUrl.split(",");
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
  deleteData() {
    this.sqlService.deleteData('delete from BuildingInfo').subscribe(res => {
      console.log(res);
    });

  }
}


