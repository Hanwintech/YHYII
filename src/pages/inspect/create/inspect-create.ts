import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { IonicPage, NavParams, AlertController, ToastController, LoadingController, NavController, Platform, ActionSheetController, ModalController } from 'ionic-angular';
import { ImageViewerController } from 'ionic-img-viewer';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { IHttpCommonResponse } from './../../../models/httpCommonResponse.model';
import { PreviewPicturePage } from "../../../shared/preview-picture/preview-picture";
import { nativeImgService } from './../../../services/nativeImg.service';
import { _baseService } from "./../../../services/_base.service"
import { addInsepct } from './../../../models/inspect/add-inspect.model';
import { InspectService } from './../../../services/inspect.service';
import { Storage } from '@ionic/storage';
import { Network } from '@ionic-native/network';

@IonicPage()
@Component({
  selector: 'page-inspect-create',
  templateUrl: 'inspect-create.html',
})

export class InspectCreatePage {
  @ViewChild('fileInput') fileInput;
  @ViewChild('panel') panel: ElementRef;
  dataSource;
  //图片查看组件中的 图片顺序、图片地址（此处放清晰大图的地址）
  initialSlide: number = 0;
  picturePaths: string[] = [];
  //巡查图片缩略图
  fileObjList;
  fileObjBigList;
  //处理图片缩略图
  fileObjHandleList;
  fileObjBigHandleList;
  questionType = ['巡查正常', '出现问题已处理', '出现问题未处理'];
  questionShowHide = false;//巡查状态与问题类型的关联控制
  handleShowHide = false;
  imagesName = [];
  imagesUrlId = [];
  constructor(public navCtrl: NavController,
    public navParams: NavParams, formBuilder: FormBuilder, public imageViewerCtrl: ImageViewerController,
    private alertCtrl: AlertController, public platform: Platform,
    private loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private modalCtrl: ModalController,
    public actionSheetCtrl: ActionSheetController,
    public transfer: FileTransfer, public file: File,
    private nativeImgService: nativeImgService,
    private baseService:_baseService,
    private storage: Storage,
    private inspectService: InspectService) {
  }
  ionViewDidEnter() {
    this.inspectService.getInspect(this.navParams.data)
      .subscribe(res => {
        let list = res as IHttpCommonResponse<addInsepct[]>
        this.dataSource = list.data;
        this.fileObjList = this.dataSource.sPicUrl;
        this.fileObjBigList = JSON.parse(JSON.stringify(list.data.picUrl));
        this.fileObjHandleList = this.dataSource.reformSPicUrl;
        this.fileObjBigHandleList =JSON.parse(JSON.stringify(list.data.reformPicUrl));
        if (this.dataSource.inpectStatus == 3) {
          this.questionShowHide = true;
          this.handleShowHide = true;
        }
        else if (this.dataSource.inpectStatus == 2) {
          this.questionShowHide = true;
        }
      },
      error => {
        alert(error);
      });
  }
  
  viewerInspectPicture(index) {//照片预览
    let picturePaths = [];
    for (let fileObj of this.fileObjBigList) {
      picturePaths.push(this.inspectService.getPicUrl(fileObj));
    }
    this.modalCtrl.create(PreviewPicturePage, { 'initialSlide': index, 'picturePaths': picturePaths }).present();
  }
  viewerHandlePicture(index) {//照片预览
    let picturePaths = [];
    for (let fileObj of this.fileObjBigHandleList) {
      picturePaths.push(this.inspectService.getPicUrl(fileObj));
    }
    this.modalCtrl.create(PreviewPicturePage, { 'initialSlide': index, 'picturePaths': picturePaths }).present();
  }
  statusEvent(value) {
    this.dataSource.inpectStatus = value;
    if (value == "2") {
      this.questionShowHide = true;
    }
    else if (value == "3") {
      this.questionShowHide = true;
      this.handleShowHide = true;
    }
    else if (value == "1") {
      this.questionShowHide = false;
      this.handleShowHide = false;
    }
  }
  questionEvent(value) {
    this.dataSource.questionType = value;
  }
  deleteInspectPicture(index) {
    let that = this;
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: '删除',
          handler: () => {
            that.fileObjList.splice(index, 1);
            that.fileObjBigList.splice(index, 1);
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
  deleteHandlePicture(index) {
    let that = this;
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: '删除',
          handler: () => {
            that.fileObjHandleList.splice(index, 1);
            that.fileObjBigHandleList.splice(index, 1);
            that.dataSource.reformPicUrl.splice(index, 1);
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
  getPicture(para) {
    let that = this;
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: '拍摄',
          handler: () => {
            that.nativeImgService.getPictureByCamera().subscribe(img => {
              if (para == 0) {
                this.fileObjList.unshift(img);//img是本地路劲
               this.fileObjBigList.unshift(img);
              }
              else {
                this.fileObjHandleList.unshift(img);
                 this.fileObjBigHandleList.unshift(img);
              }
              this.uploadFile(img, para);
            })
          }
        }, {
          text: '从相册选择',
          handler: () => {
            this.nativeImgService.getPictureByPhotoLibrary().subscribe(img => {
              if (para == 0) {
                this.fileObjList.unshift(img);//img是本地路劲
                this.fileObjBigList.unshift(img);
              }
              else {
                this.fileObjHandleList.unshift(img);
                 this.fileObjBigHandleList.unshift(img);
              }
              this.uploadFile(img, para);
            });
          }
        }
      ]
    });
    actionSheet.present();
  }
  private uploadFile(uploadImg, category) {
    //上传图片
    const fileTransfer: FileTransferObject = this.transfer.create();
    let options: FileUploadOptions = {
      fileKey: 'file',
      fileName: 'name.jpg',
    }
    fileTransfer.upload(uploadImg,
      encodeURI(this.baseService.baseUrl+'/api/Upload/SaveTempFile'),
      options, true).then((data) => {
        if (category == 0) {
          this.dataSource.picUrl.unshift(JSON.parse(data.response).data);
        }
        else {
          this.dataSource.reformPicUrl.unshift(JSON.parse(data.response).data);
        }
      }, (err) => {
        let alert = this.alertCtrl.create({
          title: '提示',
          subTitle: '文件上传出错！',
          buttons: ['确定']
        });
        alert.present();
      })
  }
  submit() {
    let loading = this.loadingCtrl.create({
      dismissOnPageChange: true,
      content: '正在提交信息'
    });
    loading.present();
    this.dataSource.picUrl = this.dataSource.picUrl.map(function (item) {
      return item.split("/").pop();
    });

    this.dataSource.reformPicUrl = this.dataSource.reformPicUrl.map(function (item) {
      return item.split("/").pop();
    });
    this.inspectService.getSaveInspect(this.dataSource).subscribe(res => {
      if (res.data == true) {
        let toast = this.toastCtrl.create({
          message: '提交成功！',
          cssClass: 'background:#ddd;',
          duration: 1000
        });
        toast.present();
        loading.dismiss();
        this.navCtrl.pop();
      }
      else {
        let alert = this.alertCtrl.create({
          title: '提示',
          subTitle: '信息提交失败！',
          buttons: ['确定']
        });
        alert.present();
        loading.dismiss();
      }
    }, error => {
      let alert = this.alertCtrl.create({
        title: '提示',
        subTitle: '信息提交失败！',
        buttons: ['确定']
      });
      alert.present();
      loading.dismiss();
    })

  }
}