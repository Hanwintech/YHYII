import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { IonicPage, NavParams, NavController, MenuController, PopoverController, ModalController, Platform } from 'ionic-angular';
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
  titleName = "涵虚牌楼";
  //itemCheckBox的变量控制
  itemCheckBox = true;
  dataSource;
  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public navParams: NavParams,
    private modalCtrl: ModalController,
    public backButtonService: BackButtonService,
    private sqlService: SqlService,
    private platform: Platform,
    public popoverCtrl: PopoverController) {

  }
  ionViewDidEnter() {
    // this.menuCtrl.toggle("tzCreateMenu");
    this.getData();
  }

  getData() {

    let queryStr1 = 'select * from DisInspectPosition';
    this.sqlService.getSelectData(queryStr1).subscribe(res => {
      console.log(res);
     this.dataSource=this.list_to_tree(res);
     //console.log(this.dataSource);
    }, (error) => {
    });
    let queryStr2 = 'select * from DiseaseRecord';
    this.sqlService.getSelectData(queryStr2).subscribe(res => {
      console.log(res);
     this.dataSource=this.list_to_tree(res);
     //console.log(this.dataSource);
    }, (error) => {
    });
    let queryStr3 = 'select a.ID, a.PID,a.PositionName,a.Type, b.isRepaired from DisInspectPosition a  left join (select * from DiseaseRecord where ancientArcID="'+this.navParams.data+'") b on b.inspectionPositionID = a.ID';
    this.sqlService.getSelectData(queryStr3).subscribe(res => {
      console.log(res);
     this.dataSource=this.list_to_tree(res);
     //console.log(this.dataSource);
    }, (error) => {
    });

  }

  leftMenu() {
    this.menuCtrl.toggle("inspectCreateMenu");
  }
  itemCheck(diseaseInfo) {
    let inspectDetail = this.modalCtrl.create("InspectDetailPage",{ID:diseaseInfo.ID,ancientArcID:this.navParams.data});
    inspectDetail.onDidDismiss(data => {
      diseaseInfo.isRepaired=data;
      alert(diseaseInfo.isRepaired);
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