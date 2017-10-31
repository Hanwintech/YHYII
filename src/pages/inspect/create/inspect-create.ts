import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { IonicPage, AlertController, NavParams, LoadingController, NavController, MenuController, PopoverController, ModalController, Platform } from 'ionic-angular';
import { InspectMorePage } from '../more/inspect-more';
import { BackButtonService } from "./../../../services/backButton.service";
import { SqlService } from "./../../../services/sqlite.service";


@IonicPage()
@Component({
  selector: 'page-inspect-create',
  templateUrl: 'inspect-create.html',
})

export class InspectCreatePage {
  @ViewChild('fileInput') fileInput;
  @ViewChild('panel') panel: ElementRef;
  menuList = [];
  structureTaiMing = [];
  structureDaliMu = [];
  titleName;
  //itemCheckBox的变量控制
  itemCheckBox = true;
  dataSource;
  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    public backButtonService: BackButtonService,
    private sqlService: SqlService,
    private platform: Platform,
    private loadingCtrl: LoadingController,
    public popoverCtrl: PopoverController) {
    let loading = this.loadingCtrl.create({ dismissOnPageChange: true, content: '正在加载数据' });
    loading.present();
  }
  ionViewDidEnter() {
    this.getData();
    this.titleName = this.navParams.data.Name;

  }

  getData() {
    console.log(this.navParams.data.ID);
    let queryStr2 = 'select * from DiseaseRecord';
    this.sqlService.getSelectData(queryStr2).subscribe(res => {
      console.log(res);
      loading.dismiss();
      console.log(res);
      //console.log(this.dataSource);

      // if (!res) {
      //   let alert = this.alertCtrl.create({ title: '警告！', subTitle: '您还没有下载巡检数据！请到设置页面下载巡检数据！', buttons: ['确定'] });
      //   alert.present();
      // }
    }, (error) => {
    });

    let loading = this.loadingCtrl.create({ dismissOnPageChange: true, content: '正在加载数据' });
    loading.present();
    let queryStr3 = 'select a.ID, a.PID,a.PositionName,a.Type, b.isRepaired from DisInspectPosition a  left join (select * from DiseaseRecord where ancientArcID="' + this.navParams.data.ID + '") b on b.inspectionPositionID = a.ID';
    this.sqlService.getSelectData(queryStr3).subscribe(res => {
      console.log(res);
      loading.dismiss();
      this.dataSource = this.list_to_tree(res);
      // //console.log(this.dataSource);

      // if (!res) {
      //   let alert = this.alertCtrl.create({ title: '警告！', subTitle: '您还没有下载巡检数据！请到设置页面下载巡检数据！', buttons: ['确定'] });
      //   alert.present();
      // }
    }, (error) => {
    });
  }

  leftMenu() {
    this.menuCtrl.toggle("inspectCreateMenu");
  }
  itemCheck(diseaseInfo) {
    let inspectDetail = this.modalCtrl.create("InspectDetailPage", { ID: diseaseInfo.ID, ancientArcID: this.navParams.data.ID });
    inspectDetail.onDidDismiss(data => {
      if (data != undefined) {
        diseaseInfo.isRepaired = data;
      }
    })
    inspectDetail.present();


  }
  private list_to_tree(list) {
    var tree = [];
    var refer = [];
    for (var i = 0; i < list.length; i++) {
      refer[list[i].ID] = list[i];
    }

    for (var i = 0; i < list.length; i++) {
      var parentId = list[i].PID;
      if (0 == parentId) {
        tree.push(list[i]);
      } else {
        if (refer[parentId]) {
          let parent = refer[parentId];
          if (!parent.child) parent.child = [];
          parent.child.push(list[i]);
        }
      }
    }
    return tree;
  }


}