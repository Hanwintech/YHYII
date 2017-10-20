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

  uploadData(): Observable<boolean> {

    return Observable.create(observe => {
      this.uploadFile().subscribe(res => {
        if (!res) {
          alert("上传附件失败");
        }
      }, error => {
        observe.next(false);
      });
      this.getDiseaseData('select * from DiseaseRecord').subscribe(res => {
        observe.next(true);
      }, error => {
        observe.next(false);
      });
    }, error => { });
  }


  //上传图片
  uploadFile(): Observable<boolean> {
    return Observable.create(observer => {
      this.getPicName().subscribe(res => {
        console.log(res);
        for (let i = 0; i < res.length; i++) {
          this.uploadSingleFile(res[i]).subscribe(res => {
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
        encodeURI(this.apiService.baseUrl + '/Inspect/SaveTempFile'),
        options, true).then((data) => {
          res.next(true);
        }, (err) => {
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

  private download(imgData) {
    const fileTransfer: FileTransferObject = this.transfer.create();
    let options: FileUploadOptions = {
    }
    const url = 'http://www.kingwong.com/images/Beijing/web_xsmall/Yiheyuan/bjing0069.jpg';
    fileTransfer.download(url, this.file.externalRootDirectory + 'com.hanwintech.yhyii/' + '' + imgData + '').then((entry) => {
      console.log('download complete: ' + entry.toURL());
      // alert(entry.toURL());
      alert(this.file.externalRootDirectory);
      fileTransfer.onProgress;
      // alert( fileTransfer.onProgress);
    }, (error) => {
      // handle error
    });

    fileTransfer.onProgress;
  }

  private removeFile(imgData) {
    this.file.removeFile(this.file.externalRootDirectory + 'com.hanwintech.yhyii/', '' + imgData + '').then(res => {
      console.log(res);
    }).catch(err => console.log(err));
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
    this.sqlService.deleteData('delete from DiseaseRecord').subscribe(res => {
      console.log(res);
    });

  }
}


