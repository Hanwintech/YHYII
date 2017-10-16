import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController,ViewController,ToastController,AlertController,ActionSheetController } from 'ionic-angular';
import { addInsepct } from './../../../models/inspect/add-inspect.model';
import { nativeImgService } from './../../../services/nativeImg.service';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { SqlService } from "../../../services/sqlite.service";
import { _baseService } from "./../../../services/_base.service"
import { PreviewPicturePage } from "../../../shared/preview-picture/preview-picture";
import { File } from '@ionic-native/file';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';


/**
 * Generated class for the InspectDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
declare var imgUrl;
@IonicPage()
@Component({
  selector: 'page-inspect-detail',
  templateUrl: 'inspect-detail.html',
})
export class InspectDetailPage {
  radioBtn = false;
  dataSource = new addInsepct ();
  fileObjList=[];//图片地址
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
    private baseService: _baseService,
    public actionSheetCtrl: ActionSheetController,
    private file: File,
    public transfer: FileTransfer,
  ) {
    console.log(this.dataSource);
    this.dataSource.damamgeDegreeSource = [
      { key: "313", value: "轻微待观察" },
      { key: "314", value: "一般，无明恶化迹象" },
      { key: "315", value: "中等，有恶化迹象" },
      { key: "316", value: "严重，需立即修复" }
    ];
    this.dataSource.workTypeSource = [
      { key: "1", value: "油作" },
      { key: "2", value: "石作" }];

  }

  ionViewDidEnter() {
  //this.selectData(this.navParams.data);
  }
  itemCheck(radioBtn) {
    //radioBtn=!radioBtn;
  }
  closePage() {
    this.navCtrl.pop();
  }
  getPicture() {

    alert(this.file.externalRootDirectory);

    this.nativeImgService.getPictureByCamera().subscribe(img => {
      let img_name = img.split('/').pop();
      this.file.createDir(this.file.externalRootDirectory, 'com.hanwintech.yhyii', true).then(_ => {
        this.file.moveFile(this.file.externalCacheDirectory, img_name, this.file.externalRootDirectory + 'com.hanwintech.yhyii', '').then(_ => {
          this.fileObjList.push(this.file.externalRootDirectory + 'com.hanwintech.yhyii/'+img_name);
        this.dataSource.picUrl.push(this.file.externalRootDirectory + 'com.hanwintech.yhyii/'+img_name);
        this.uploadFile(this.file.externalRootDirectory + 'com.hanwintech.yhyii/'+img_name);
        }).catch(err => console.log(err));
      }).catch(err => console.log('create fail'));
    })
  }
  viewerInspectPicture(index) {//照片预览
    let picturePaths = [];
    for (let fileObj of this.fileObjList) {
      picturePaths.push(fileObj);
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
      encodeURI(this.baseService.baseUrl + '/Inspect/SaveTempFile'),
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
  submitData() {
    this.dataSource.parentId=1111;
    this.viewCtrl.dismiss();
    this.sqlService.insertData(this.dataSource).subscribe(res => {
      if (res == "1") {
        let toast = this.toastCtrl.create({
          message: '数据暂存成功！',
          cssClass: 'background:#ddd;',
          duration: 1000
        });
        toast.present();
      }
      else {
        let alert = this.alertCtrl.create({
          title: '提示',
          subTitle: '保存出错！',
          buttons: ['确定']
        });
        alert.present();
        console.log(res);
      }
    }, (error => {
      let alert = this.alertCtrl.create({
        title: '提示',
        subTitle: '保存出错2！',
        buttons: ['确定']
      });
      alert.present();
    }))
  }

  selectData(id){
    id=1111;
    this.sqlService.getSelectData("select * from detail where parentId='1111'").subscribe(res=>{
      console.log(res[0]);
      console.log(res);
    },(error=>{
    console.log(error);
    }));


    this.sqlService.getSelectData("select recordId from detail").subscribe(res=>{
      console.log(res[2]);
      console.log(res);
    },(error=>{
    console.log(error);
    }));
  }
}
