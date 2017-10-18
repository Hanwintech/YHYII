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
import { Headers, RequestMethod, Request } from '@angular/http';
import { BaseRequest } from './../../services/baseRequest';
import { IHttpCommonResponse } from "./../../models/httpCommonResponse.model";
import { fillTz } from "./../../models/tz/fill-tz.model";

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
    public actionSheetCtrl: ActionSheetController
  ) {
    this.download();

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
    this.inspectService.getDiseaseInspection().subscribe((res) => {
      console.log(res);
      this.json = {
        "structure": {
          "tables": {
            "Area": "(Description,ID,Name)",
            "Scenery": "(Description,ID,InspectAreaID,Name,XOrder)",
            "DisInspectPosition": "(ID,PID,PositionName,Type,XOrder)",
            "AncientArchitecture": "(ID,Name,SceneryName)",
            "diseaseRecord": "(InspectionPositionID,ancientArcID,diseaseLevel,inspectDescription,inspectPerson,inspectTime,isRepaired,location,picUrl,recordId,repairDescription,respairTime,workType)"
          }
        },
        "data": {
          "inserts": {
            "Area": JSON.parse(res[0]),
            "Scenery": JSON.parse(res[1]),
            "DisInspectPosition": JSON.parse(res[2]),
            "AncientArchitecture": JSON.parse(res[3]),
            "diseaseRecord": JSON.parse(res[4]),
          }
        }
      };
      this.sqlService.initialData(this.json);
    }, (error) => {
      console.log(error);
    });
  }


  uploadData() {

    // let connectSubscription = this.network.onConnect().subscribe((res) => {
    //   alert('network connected!');
    //   alert(res);
    //     if (this.network.type === 'wifi') {
    //       alert('we got a wifi connection, woohoo!');
    //     }
    // });
    if (this.network.type === 'wifi') {
      //alert('we got a wifi connection,23213214324!');
      this.sqlService.getSelectData('select * from DiseaseRecord').subscribe(res => {
        console.log(res);
      }, (error) => { });



    }


    let alert = this.alertCtrl.create({
      title: '提交巡检数据？',
      subTitle: '若提交数据后，您之前巡检的内容将被清空，是否继续？',
      buttons: [
        {
          text: '暂不提交',
          handler: () => {
            return;
          }
        },
        {
          text: '提交',
          handler: () => {
            console.log('Agree clicked');
          }
        }
      ]
    });
    alert.present();
  }

  // private uploadItemData() {
  //   this.sqlService.getSelectData("select * from detail").subscribe(res => {
  //     console.log(res[0]);
  //     console.log(res);
  //   }, (error => {
  //     console.log(error);
  //   }));



  // }

  private uploadFile(uploadImg, category) {
    //上传图片
    const fileTransfer: FileTransferObject = this.transfer.create();
    let options: FileUploadOptions = {
      fileKey: 'file',
      fileName: 'name.jpg',
    }
    fileTransfer.upload(uploadImg,
      encodeURI(this.apiService.baseUrl + '/Inspect/SaveTempFile'),
      options, true).then((data) => {

      }, (err) => {
        let alert = this.alertCtrl.create({
          title: '提示',
          subTitle: '文件上传出错！',
          buttons: ['确定']
        });
        alert.present();
      })
  }
  private download() {
    console.log(1);
    //上传图片
    const fileTransfer: FileTransferObject = this.transfer.create();
    let options: FileUploadOptions = {
      fileKey: 'file',
      fileName: 'name.jpg',
    }
    const url = 'http://www.kingwong.com/images/Beijing/web_xsmall/Yiheyuan/bjing0069.jpg';
    fileTransfer.download(url, this.file.externalRootDirectory + 'com.hanwintech.yhyii/' + 'bjing0069.jpg').then((entry) => {
      console.log('download complete: ' + entry.toURL());
      // alert(entry.toURL());
      // alert(this.file.externalRootDirectory);
      fileTransfer.onProgress;
      // alert( fileTransfer.onProgress);
    }, (error) => {
      // handle error
    });

    fileTransfer.onProgress;
  }


  private removeDir() {
    this.file.removeDir(this.file.externalRootDirectory, 'com.hanwintech.yhyii').then(_ => {

    }).catch(err => console.log('remove fail'));
  }

  getData() {
    this.sqlService.getSelectData("select * from Scenery").subscribe((res) => {
      console.log(res);
    }, error => {

    });
  }
  //古建台账数据同步
  synchronousData() {
    let request: BaseRequest = new BaseRequest();
    request.method = "GET";
    request.requestUrl = "/api/AncientArchiteture/GetAncientArchitectureList";
    this.apiService.sendApi(request).subscribe(
      (res) => {
        let filltz = res.data;
        console.log(filltz.length);
        this.json = {
          "structure": {
            "tables": {
              "Tz": `(id,status,date,_01bh,_01mc,_01jzmj,_01ssjq,_01jglx,_01jzxs,_01jzgn,_01sjnd,_01xcnd,_01zhxssj,_02pmxz,_02lt,
_02bs,_02ql,_02zwl,_02hl,_02mk,_02tmkcc,_02js,_02tjscc,_03tjcl,_03tjxs,_03tjgd,_03dmcl,_03dmzf,_03yt,_03ytlglb,_03tj,_03tjzs,_03bgs,
_03bgssl,_04cl,_04qsqf,_04xjqf,_04xjgd,_05ljcl,_05ljxs,_05yzzj,_05ttsl,_06xydg,_06dkcc,_06ms,_06jkcs,_06ztkcs,_06pskcs,_06sydg,_06dkcc2,
_06ms2,_06jkcs2,_06ztkcs2,_06pskcs2,_07gslj,_07gscl,_07fm,_07lccl,_07yc,_07ycxz,_07yzjlg,_07dgmz,_07zdmz,_07th,_08xjzz,_08ljch,_08ljchlx,
_08thch,_08thchlx,_09wdxs,_09wmlx,_09llwys,_09jbys,_09ws,_09xrzs,_09zssl,_09qtgj,_09fcxpgd,_09zjgd,_10gjbz,_11wtms)`
            }
          },
          "data": {
            "inserts": {
              "Tz": (filltz[0] as fillTz),
            }
          }
        };
        this.sqlService.importJsonToDb(this.json)
          .then(() => {
            this.sqlService.getSelectData("select * from Tz").subscribe((res) => {
              console.log(res);
            });
          })
          .catch(e => console.error(e));
      },
      (error) => {
        alert(error);
      });
  }
}


