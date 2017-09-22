import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform, IonicPage, AlertController, NavParams ,MenuController} from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

import { ApiService } from './../../../services/api.service';
import { BaseRequest } from './../../../services/baseRequest';
import { IHttpCommonResponse } from './../../../models/httpCommonResponse.model';
import { InspectInfo } from './../../../models/map/inspectInfo.model';

declare var BMap;

@IonicPage()
@Component({
  selector: 'page-inspect-index',
  templateUrl: 'inspect-index.html',
})
export class InspectIndexPage {
  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('header') header;
  menuList = [];
  scenery = [];
  scenery1 = [];
  titleName = "巡检一区";
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public geolocation: Geolocation,
    public apiService: ApiService,
    public alertCtrl: AlertController,
    public menuCtrl:MenuController) { 
      this.menuList = [
        { id: "1", name: "东宫门景区" },
        { id: "2", name: "仁寿殿景区" },
        { id: "3", name: "德和园景区" },
        { id: "4", name: "紫气东来城关" },
        { id: "5", name: "谐趣园景区" },
        { id: "6", name: "霁清轩景区" },
        { id: "7", name: "眺远斋景区" },
        { id: "8", name: "老文物库" },
      ];
      this.scenery = [
        { id: "01", name: "涵虚牌楼", parentName: "东宫门景区", inspectTime: "2017-06-06" },
        { id: "02", name: "影壁", parentName: "东宫门景区", inspectTime: "2017-06-06" },
        { id: "03", name: "东宫门", parentName: "东宫门景区", inspectTime: "2017-06-06" },
        { id: "04", name: "北朝房", parentName: "东宫门景区", inspectTime: "2017-06-06" },
        { id: "05", name: "南朝房", parentName: "东宫门景区", inspectTime: "" },
        { id: "06", name: "北罩门", parentName: "东宫门景区", inspectTime: "" },
        { id: "07", name: "南罩门", parentName: "东宫门景区", inspectTime: "" },
        { id: "08", name: "外围墙", parentName: "东宫门景区", inspectTime: "" },
      ];
      this.scenery1 = [
        { id: "01", name: "涵虚牌楼1", parentName: "仁寿殿景区", inspectTime: "2017-06-06" },
        { id: "02", name: "影壁1", parentName: "仁寿殿景区", inspectTime: "2017-06-06" },
        { id: "03", name: "东宫门1", parentName: "仁寿殿景区", inspectTime: "2017-06-06" },
        { id: "04", name: "北朝房1", parentName: "仁寿殿景区", inspectTime: "2017-06-06" },
        { id: "05", name: "南朝房1", parentName: "仁寿殿景区", inspectTime: "" },
        { id: "06", name: "北罩门1", parentName: "仁寿殿景区", inspectTime: "" },
        { id: "07", name: "南罩门1", parentName: "仁寿殿景区", inspectTime: "" },
        { id: "08", name: "外围墙1", parentName: "仁寿殿景区", inspectTime: "" },
      ];
    }

  inspectHistory() {
   
  }
  ionViewDidLoad() {

  }
  select(){
    this.menuCtrl.toggle("inspectListMenu");
  }
  openPage(selectedId) {
    if (selectedId == 2) {
      this.scenery = this.scenery1;
    }
    else {
      this.scenery = this.scenery;
    }
   // this.inspectMenu();
  }
  openCreatePage(selectedId){
    this.navCtrl.push("InspectCreatePage");
  }

}
