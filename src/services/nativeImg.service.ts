import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file'
import { Observable } from "rxjs";

@Injectable()
export class nativeImgService {
  constructor(public transfer: FileTransfer, public file: File, public camera: Camera, private alertCtrl: AlertController, ) { }
  /**
     * 使用cordova-plugin-camera获取照片
     * @param options
     */
  getPicture(options: CameraOptions = {}): Observable<string> {
    let ops: CameraOptions = Object.assign({
      sourceType: this.camera.PictureSourceType.CAMERA,//图片来源,CAMERA:拍照,PHOTOLIBRARY:相册
      destinationType: 2,//默认返回base64字符串,DATA_URL:base64   FILE_URI:图片路径
      quality: 80,//图像质量，范围为0 - 100
      allowEdit: false,//选择图片前是否允许编辑
      encodingType: this.camera.EncodingType.JPEG,
      targetWidth: 1980,//缩放图像的宽度（像素）
      targetHeight: 1440,//缩放图像的高度（像素）
      saveToPhotoAlbum: false,//是否保存到相册
    }, options);
    return Observable.create(observer => {
      this.camera.getPicture(ops).then((imgData: string) => {
        if (ops.destinationType === this.camera.DestinationType.DATA_URL) {
          observer.next('data:image/jpg;base64,' + imgData);
        } else {
          observer.next(imgData);
        }
      }).catch(err => {
        if (err == 20) {
          this.alert('没有权限,请在设置中开启权限');
          return;
        }
        if (String(err).indexOf('cancel') != -1) {
          return;
        }
        this.log('getPicture:' + err);
      });
    });
  };

  /**
   * 通过拍照获取照片
   * @param options
   */
  getPictureByCamera(options: CameraOptions = {}): Observable<string> {
    let ops: CameraOptions = Object.assign({
      sourceType: this.camera.PictureSourceType.CAMERA,
    }, options);
    return this.getPicture(ops);
  };

  /**
   * 通过图库获取照片
   * @param options
   */
  getPictureByPhotoLibrary(options: CameraOptions = {}): Observable<string> {
    let ops: CameraOptions = Object.assign({
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    }, options);
    return this.getPicture(ops);
  };

  log(info): void {
    console.log('%cNativeService/' + info, 'color:#C41A16');
  }

  alert(title: string, subTitle: string = "", ): void {
    this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: [{ text: '确定' }]
    }).present();
  }

}  