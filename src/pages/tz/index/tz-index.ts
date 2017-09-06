import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform, IonicPage, AlertController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

import { ApiService } from './../../../services/api.service';
import { BaseRequest } from './../../../services/baseRequest';
import { IHttpCommonResponse } from './../../../models/httpCommonResponse.model';
import { InspectInfo } from './../../../models/map/inspectInfo.model';
import { MenuController } from 'ionic-angular';
declare var BMap;

@IonicPage()
@Component({
  selector: 'page-tz-index',
  templateUrl: 'tz-index.html',
})
export class TZIndexPage {
  dataSource = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public geolocation: Geolocation,
    public apiService: ApiService,
    public alertCtrl: AlertController,
    public menuCtrl: MenuController) {
    this.dataSource = [
      { id: "1", number: "A00001", name: "东宫门牌坊", area: "AAAA景区", time: "2017-08-16", status: "1" },
      { id: "2", number: "A00001", name: "东宫门", area: "BBBB景区", time: "2017-08-16", status: "2" },
      { id: "3", number: "A00001", name: "东宫门", area: "CCCC景区", time: "2017-08-16", status: "1" },
      { id: "4", number: "A00001", name: "东宫门", area: "DDDD景区", time: "2017-08-16", status: "2" },
      { id: "5", number: "A00001", name: "东宫门", area: "AAAA景区", time: "2017-08-16", status: "1" },
      { id: "6", number: "A00001", name: "东宫门", area: "AAAA景区", time: "2017-08-16", status: "2" },
      { id: "7", number: "A00001", name: "东宫门", area: "AAAA景区", time: "2017-08-16", status: "1" }];
  }

  ionViewDidLoad() {
  }

  itemSelected() {
    this.navCtrl.push("TZCreatePage");
  }

  select() {
    this.menuCtrl.open("tzListMenu");
  }
  closeSelect(){
    this.menuCtrl.close("tzListMenu");
  }
}