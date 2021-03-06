import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController, ToastController, AlertController, ActionSheetController } from 'ionic-angular';
import { addInsepct } from './../../../models/inspect/add-inspect.model';
import { nativeImgService } from './../../../services/nativeImg.service';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { SqlService } from "../../../services/sqlite.service";
import { ApiService } from "./../../../services/api.service"
import { PreviewPicturePage } from "../../../shared/preview-picture/preview-picture";
import { File } from '@ionic-native/file';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { GlobalCache } from './../../../services/globalCache.service';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-inspect-detail',
  templateUrl: 'inspect-detail.html',
})
export class InspectDetailPage {
  radioBtn = false;
  dataSource;
  fileObjList = [];//图片地址
  damamgeDegreeSource;
  workTypeSource;
  isHaveData;
  isView;
  userName;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private nativeImgService: nativeImgService,
    private sqlite: SQLite,
    private modalCtrl: ModalController,
    public viewCtrl: ViewController,
    private alertCtrl: AlertController,
    public toastCtrl: ToastController,
    private sqlService: SqlService,
    private apiService: ApiService,
    private globalCache: GlobalCache,
    private storage: Storage,
    public actionSheetCtrl: ActionSheetController,
    private file: File,
    public transfer: FileTransfer,
  ) {

    this.damamgeDegreeSource = [
      { key: "313", value: "轻微" },
      { key: "314", value: "一般" },
      { key: "315", value: "中等" },
      { key: "316", value: "严重" }
    ];
    this.workTypeSource = [
      { key: "1", value: "瓦作" },
      { key: "2", value: "木作" },
      { key: "3", value: "油作" },
      { key: "4", value: "石作" }];
  }

  ionViewDidLoad() {
    this.sqlService.getSelectData('select * from DiseaseRecord where inspectionPositionID="' + this.navParams.data.ID + '" and ancientArcID="' + this.navParams.data.ancientArcID + '"').subscribe(res => {
      if (res.length > 0) {
        this.isHaveData = true;
        this.dataSource = res[0];
        if (this.dataSource.picUrl.length > 1) {
          let tempPic = this.dataSource.picUrl;
          this.dataSource.picUrl = tempPic.split(",");
        }
        else {
          this.dataSource.picUrl = [];
        }
        this.fileObjList = JSON.parse(JSON.stringify(this.dataSource.picUrl));
        this.isView = this.dataSource.isRepaired;
      }
      else {
        this.isHaveData = false;
        this.dataSource = new addInsepct();
        this.isView = this.dataSource.isRepaired;
      }
    }, error => {
      console.log(error);
    });
  }
  getPicUrl(pic: string): string {
    return this.file.externalRootDirectory + 'com.hanwintech.yhyii/' + pic;
  }
  getPicture() {
    let that = this;
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: '拍摄',
          handler: () => {
            that.nativeImgService.getPictureByCamera().subscribe(img => {
              console.log(img);
              let img_name = '' + img.split('/').pop() + '';
              let my = new Date();
              let newName = my.getFullYear().toString() + my.getMonth().toString() + my.getDate().toString() + my.getHours().toString()
                + my.getSeconds().toString() + my.getMilliseconds().toString() + ".jpg";
              this.file.createDir(this.file.externalRootDirectory, 'com.hanwintech.yhyii', true).then(_ => {
                this.file.moveFile(this.file.externalCacheDirectory, img_name, this.file.externalRootDirectory + 'com.hanwintech.yhyii', newName).then(_ => {
                  this.fileObjList.push(newName);
                  this.dataSource.picUrl.push(newName);
                }).catch(err => console.log(err));
              }).catch(err => console.log('create fail'));
            })
          }
        }, {
          text: '从相册选择',
          handler: () => {
            this.nativeImgService.getPictureByPhotoLibrary().subscribe(img => {
              let origionName = '' + img.split('/').pop() + '';
              let thirdName = origionName.split("?").shift();
              let my = new Date();
              let newName = my.getFullYear().toString() + my.getMonth().toString() + my.getDate().toString() + my.getHours().toString()
                + my.getSeconds().toString() + my.getMilliseconds().toString() + ".jpg";
              this.file.createDir(this.file.externalRootDirectory, 'com.hanwintech.yhyii', true).then(_ => {
                this.file.moveFile(this.file.externalCacheDirectory, thirdName, this.file.externalRootDirectory + 'com.hanwintech.yhyii', newName).then(_ => {
                  this.fileObjList.push(newName);
                  this.dataSource.picUrl.push(newName);
                }).catch(err => console.log(err));

              }).catch(err => console.log('create fail'));
            });
          }
        }
      ]
    });
    actionSheet.present();
  }
  viewerInspectPicture(index) {//照片预览
    let picturePaths = [];
    for (let fileObj of this.fileObjList) {
      picturePaths.push(this.getPicUrl(fileObj));
    }
    this.modalCtrl.create(PreviewPicturePage, { 'initialSlide': index, 'picturePaths': picturePaths }).present();
  }
  deleteInspectPicture(index) {
    let that = this;
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: '删除',
          handler: () => {
            that.fileObjList.splice(index, 1);
            that.dataSource.picUrl.splice(index, 1);
          }
        }, {
          text: '取消',
          handler: () => {
          }
        }
      ]
    });
    actionSheet.present();
  }

  closePage() {
    if (this.isView == 'false') {
      let alert = this.alertCtrl.create({
        title: '警告',
        message: '确定离开本页面？若离开，则本页面的更改数据将不会被保存！',
        buttons: [
          {
            text: '留下',
            handler: () => {
              return;
            }
          },
          {
            text: '离开',
            handler: () => {
              this.navCtrl.pop();
            }
          }
        ]
      });
      alert.present();
    }
    else {
      this.navCtrl.pop();
    }
  }
  submitData() {
    if (
      this.dataSource.location == null ||
      this.dataSource.inspectDescription == null ||
      this.dataSource.diseaseLevel == null ||
      this.dataSource.workType == null ||
      this.dataSource.location == "" ||
      this.dataSource.inspectDescription == "" ||
      this.dataSource.diseaseLevel == "" ||
      this.dataSource.workType == ""
    ) {
      let alert = this.alertCtrl.create({
        title: '提示',
        subTitle: '请完善巡检信息！',
        buttons: ['确定']
      });
      alert.present();
    }
    else {
      let jsonData;
      if (this.dataSource.repairDescription == null) {
        this.dataSource.repairDescription = "";
      }
      this.dataSource.inspectionPositionID = this.navParams.data.ID;
      this.dataSource.ancientArcID = this.navParams.data.ancientArcID;
      this.dataSource.status = "1";
      let myDate = new Date();
      this.dataSource.inspectTime = myDate.toLocaleDateString();

      if (this.isHaveData) {
        jsonData = {
          "data": {
            "updates": {
              "DiseaseRecord": [
                {
                  "set": this.dataSource,
                  "where": { "inspectionPositionID": this.navParams.data.ID, "ancientArcID": this.navParams.data.ancientArcID }
                }
              ],
            }
          }
        };
      }
      else {
        this.dataSource.recordId = this.guid();
        jsonData = {
          "data": {
            "inserts": {
              "DiseaseRecord": [
                this.dataSource
              ],
            }
          }
        };
      }
      this.sqlService.initialData(jsonData).subscribe(res => {
        if (res) {
          let toast = this.toastCtrl.create({
            message: '数据保存成功！',
            cssClass: 'background:#ddd;',
            duration: 1000
          });
          toast.present();
          this.viewCtrl.dismiss(this.dataSource.isRepaired);
        };
      }, error => {
        let alert = this.alertCtrl.create({
          title: '提示',
          subTitle: '保存出错！',
          buttons: ['确定']
        });
        alert.present();
        console.log(error);
      });
    }
  }

  private S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  private guid() {
    return (this.S4() + this.S4() + "-" + this.S4() + "-" + this.S4() + "-" + this.S4() + "-" + this.S4() + this.S4() + this.S4());
  };
}
