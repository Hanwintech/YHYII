import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform, IonicPage, AlertController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

import { ApiService } from './../../../services/api.service';
import { BaseRequest } from './../../../services/baseRequest';
import { IHttpCommonResponse } from './../../../models/httpCommonResponse.model';
import { InspectInfo } from './../../../models/map/inspectInfo.model';
import { MenuController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-tz-create',
  templateUrl: 'tz-create.html',
})
export class TZCreatePage {
  menuList = [
  ];

  selectedMenuId = "";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public geolocation: Geolocation,
    public apiService: ApiService,
    public alertCtrl: AlertController,
    public menuCtrl: MenuController
  ) {
    this.menuList = [
      { id: "1", name: "基本信息" },
      { id: "2", name: "平面形制" },
      { id: "3", name: "台基地面" },
      { id: "4", name: "墙体墙面" },
      { id: "5", name: "檐口以下立面形式" },
      { id: "6", name: "构架形制" },
      { id: "7", name: "斗栱" },
      { id: "8", name: "装修形制" },
      { id: "9", name: "油饰彩画" },
      { id: "10", name: "屋顶瓦面" },
      { id: "11", name: "附属文物" },
      { id: "12", name: "古建备注" }];
    this.selectedMenuId = this.menuList[0].id;
  }

  openMenu() {
    this.menuCtrl.open();
  }

  closeMenu() {
    this.menuCtrl.close();
  }

  toggleMenu() {
    this.menuCtrl.toggle();
  }

  ionViewDidLoad() {
  }
  
  openPage(menuId) {
    this.selectedMenuId = menuId;
    
    this.toggleMenu();
  }
}