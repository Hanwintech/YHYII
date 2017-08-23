import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, ToastController, AlertController, NavParams, ActionSheetController, ModalController } from 'ionic-angular';
import { _baseService } from "./../../services/_base.service"
import { addInsepct } from './../../models/inspect/add-inspect.model';
import { InspectService } from './../../services/inspect.service';
import { IHttpCommonResponse } from './../../models/httpCommonResponse.model';
import { PreviewPicturePage } from "../../shared/preview-picture/preview-picture";
import { nativeImgService } from './../../services/nativeImg.service';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';

/**
 * Generated class for the AddInpectHandlePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-add-inpect-handle',
  templateUrl: 'add-inpect-handle.html',
})
export class AddInpectHandlePage {
  dataSource;
  questionTypeContent = [];
  //巡查图片缩略图
  fileObjList;
  fileObjBigList;
  //处理图片缩略图
  fileObjHandleList;
  fileObjBigHandleList;
  questionShowHide = false;//巡查状态与问题类型的关联控制
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private inspectService: InspectService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private modalCtrl: ModalController,
    public actionSheetCtrl: ActionSheetController,
    public transfer: FileTransfer, public file: File,
    private nativeImgService: nativeImgService,
    private baseService:_baseService) {
  }

  ionViewDidEnter() {
    this.inspectService.getInspect(this.navParams.data)
      .subscribe(res => {
        let list = res as IHttpCommonResponse<addInsepct[]>
        this.dataSource = list.data;
        console.log(this.dataSource);
        this.fileObjList = this.dataSource.sPicUrl;
        this.fileObjBigList = this.dataSource.picUrl;
        this.fileObjHandleList = this.dataSource.reformSPicUrl;
        this.fileObjBigHandleList = JSON.parse(JSON.stringify(list.data.reformPicUrl));
        this.getQuestionType(this.dataSource.questionTypeSource, this.dataSource.questionType);
        if (this.dataSource.inpectStatus == 3) {
          this.questionShowHide = true;
        }
        else if (this.dataSource.inpectStatus == 2) {
          this.questionShowHide = true;
        }
      },
      error => {
        alert(error);
      });

  }
  //获取问题类型
  private getQuestionType(questionTypeSource, questionType) {
    for (var i = 0; i < questionType.length; i++) {
      for (let j = 0; j < questionTypeSource.length; j++) {
        if (parseInt(questionTypeSource[j].key) == questionType[i]) {
          this.questionTypeContent.push(questionTypeSource[j].value);
        }
      }
    }
  }
  viewerInspectPicture(index) {//照片预览
    let picturePaths = [];
    console.log(this.fileObjBigList);
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
    this.dataSource.inpectStatus = 3;
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
