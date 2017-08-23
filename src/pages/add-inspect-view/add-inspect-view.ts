import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { addInsepct } from './../../models/inspect/add-inspect.model';
import { InspectService } from './../../services/inspect.service';
import { IHttpCommonResponse } from './../../models/httpCommonResponse.model';
import { PreviewPicturePage } from "../../shared/preview-picture/preview-picture";

@IonicPage()
@Component({
  selector: 'page-add-inspect-view',
  templateUrl: 'add-inspect-view.html',
})
export class AddInspectViewPage {
  dataSource;
 questionTypeContent=[];
  //巡查图片缩略图
  fileObjList;
  fileObjBigList;
  //处理图片缩略图
  fileObjHandleList;
  fileObjBigHandleList;
  questionShowHide=false;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private modalCtrl: ModalController,
    private inspectService: InspectService) {
  }


  ionViewDidEnter() {
    this.inspectService.getInspect(this.navParams.data.id)
      .subscribe(res => {
        let list = res as IHttpCommonResponse<addInsepct[]>
        this.dataSource = list.data;
        console.log(this.dataSource);
        this.fileObjList = this.dataSource.sPicUrl;
        this.fileObjBigList = this.dataSource.picUrl;
        this.fileObjHandleList = this.dataSource.reformSPicUrl;
        this.fileObjBigHandleList = this.dataSource.reformPicUrl;
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
	for(var i=0;i<questionType.length;i++){
		for(let j = 0; j < questionTypeSource.length; j++){
	      if(parseInt(questionTypeSource[j].key)==questionType[i]){
	      	var vbvb=parseInt(questionTypeSource[j].key);
			var fgfg=questionType[i];
	        this.questionTypeContent.push(questionTypeSource[j].value);
	      }
	    }
	}
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

}
