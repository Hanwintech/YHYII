import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, NavParams } from 'ionic-angular';
import { SqlService } from "../../services/sqlite.service";
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { PreviewPicturePage } from "../../shared/preview-picture/preview-picture";





@IonicPage()
@Component({
  selector: 'page-search-view',
  templateUrl: 'search-view.html',
})
export class SearchViewPage {
  dataSource;
  fileObjList = [];//图片地址
  damamgeDegreeSource;
  workTypeSource;
  diseaseData;
  diseaseDataSource1;
  diseaseDataSource2;
  diseaseDataSource3;
  diseaseDataSource4;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private sqlService: SqlService,
    private file: File,
    public transfer: FileTransfer,
    private modalCtrl: ModalController,
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
    this.sqlService.getSelectData('select * from DiseaseRecord where inspectionPositionID="' + this.navParams.data.InspectionPositionID + '" and ancientArcID="' + this.navParams.data.AncientArchitectureID + '"').subscribe(res => {
      if (res.length > 0) {
        this.dataSource = res[0];
        this.dataSource.AreaName = this.navParams.data.AreaName;
        this.dataSource.SceneryName = this.navParams.data.SceneryName;
        this.dataSource.AncientName = this.navParams.data.AncientName;
        if (this.dataSource.picUrl.length > 1) {
          let tempPic = this.dataSource.picUrl;
          this.dataSource.picUrl = tempPic.split(",");
        }
        else {
          this.dataSource.picUrl = [];
        }
        this.fileObjList = JSON.parse(JSON.stringify(this.dataSource.picUrl));
      }
    }, error => {
      console.log(error);
    });

    this.sqlService.getSelectData('select PID,PositionName,ID,Type from DisInspectPosition where ID="' + this.navParams.data.InspectionPositionID + '"').subscribe((res) => {
      this.diseaseDataSource1=res[0];
      this.diseaseData=this.diseaseDataSource1.PositionName;
      this.sqlService.getSelectData('select PID,PositionName,Type from DisInspectPosition where  ID="'+this.diseaseDataSource1.PID+'"').subscribe((res)=>{
        this.diseaseDataSource2=res[0];
        this.diseaseData=this.diseaseDataSource2.PositionName+"-"+this.diseaseDataSource1.PositionName;
        if (this.diseaseDataSource2.Type=="1"){
          return;
        }
        else{
          this.sqlService.getSelectData('select PID,PositionName,Type from DisInspectPosition where ID="' + this.diseaseDataSource2.PID + '"').subscribe((res)=>{
            this.diseaseDataSource3=res[0];
            this.diseaseData=this.diseaseDataSource3.PositionName+"-"+this.diseaseDataSource2.PositionName+"-"+this.diseaseDataSource1.PositionName;
            if (this.diseaseDataSource3.Type=="1"){
             return;
            }
          });
        }
      });
    }, (error) => { });
  }
  getPicUrl(pic: string): string {
    return this.file.externalRootDirectory + 'com.hanwintech.yhyii/' + pic;
  }
  viewerInspectPicture(index) {//照片预览
    let picturePaths = [];
    for (let fileObj of this.fileObjList) {
      picturePaths.push(this.getPicUrl(fileObj));
    }
    this.modalCtrl.create(PreviewPicturePage, { 'initialSlide': index, 'picturePaths': picturePaths }).present();
  }
}
