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

<<<<<<< HEAD

/**
 * Generated class for the InspectDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

=======
declare var imgUrl;
>>>>>>> d88be1b03cc9515bb52b9eb11046347b923c7aea
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
    public actionSheetCtrl: ActionSheetController,
    private file: File,
    public transfer: FileTransfer,
  ) {

    this.damamgeDegreeSource = [
      { key: "313", value: "轻微待观察" },
      { key: "314", value: "一般，无明恶化迹象" },
      { key: "315", value: "中等，有恶化迹象" },
      { key: "316", value: "严重，需立即修复" }
    ];
    this.workTypeSource = [
      { key: "1", value: "油作" },
      { key: "2", value: "石作" }];
  }

  ionViewDidLoad() {
  this.dataSource = new addInsepct();
    this.sqlService.getSelectData('select * from DiseaseRecord where InspectionPositionID="' + this.navParams.data.ID + '"').subscribe(res => {
      if (res) {
        this.isHaveData = true;
        this.dataSource = res[0];
        if (this.dataSource.picUrl.length > 1) {
         let tempPic=this.dataSource.picUrl;
         this.dataSource.picUrl=tempPic.split(",");
        }
        else {
          console.log("没图片");
          this.dataSource.picUrl = [];
        }
        this.fileObjList =JSON.parse(JSON.stringify(this.dataSource.picUrl));
      }
      else {
        this.isHaveData = false;
        this.dataSource = new addInsepct();
      }
    }, error => {
      console.log(error);
    });
  }
  getPicUrl(pic: string): string {
    return this.file.externalRootDirectory + 'com.hanwintech.yhyii/' + pic;
  }
  itemCheck(radioBtn) {
    //radioBtn=!radioBtn;
  }
  closePage() {
    this.navCtrl.pop();
  }
  getPicture() {
    this.nativeImgService.getPictureByCamera().subscribe(img => {
      let img_name = ''+img.split('/').pop()+'';
      console.log(typeof(img_name));
      this.file.createDir(this.file.externalRootDirectory, 'com.hanwintech.yhyii', true).then(_ => {
        this.file.moveFile(this.file.externalCacheDirectory, img_name, this.file.externalRootDirectory + 'com.hanwintech.yhyii', '').then(_ => {
          this.fileObjList.push(img_name);
          this.dataSource.picUrl.push(img_name);
        }).catch(err => console.log(err));
      }).catch(err => console.log('create fail'));
    })
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
<<<<<<< HEAD
=======

  damamgeDegreeEvent(value){
    this.dataSource.damamgeDegree=value;
  }
  workTypeEvent(value){
    this.dataSource.workType=value;
  }

  private uploadFile(uploadImg) {
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
>>>>>>> d88be1b03cc9515bb52b9eb11046347b923c7aea
  submitData() {
    let jsonData;
    this.dataSource.InspectionPositionID = this.navParams.data.ID;
    this.dataSource.ancientArcID = this.navParams.data.ancientArcID;
    this.dataSource.recordId = this.guid();
    console.log("图片为：");
    console.log(this.dataSource.picUrl);
    let myDate = new Date();
    this.dataSource.inspectTime = myDate.toLocaleDateString();
    console.log(this.dataSource);
    this.viewCtrl.dismiss();
    if (this.isHaveData) {
      jsonData = {
        "data": {
          "updates": {
            "DiseaseRecord": [
              {
                "set": this.dataSource,
                "where": this.navParams.data.ID
              }
            ],
          }
        }
      };
    }
    else {
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
      }
    }, error => {
      let alert = this.alertCtrl.create({
        title: '提示',
        subTitle: '保存出错！',
        buttons: ['确定']
      });
      alert.present();
      console.log(error);
    });
    this.sqlService.getSelectData("select * from DiseaseRecord").subscribe(res => {
      console.log(res);
    }, error => { });

  }
  private S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  private guid() {
    return (this.S4() + this.S4() + "-" + this.S4() + "-" + this.S4() + "-" + this.S4() + "-" + this.S4() + this.S4() + this.S4());
  };
}
