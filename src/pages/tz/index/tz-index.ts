import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform, IonicPage, AlertController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

import { ApiService } from './../../../services/api.service';
import { BaseRequest } from './../../../services/baseRequest';
import { IHttpCommonResponse } from './../../../models/httpCommonResponse.model';
import { InspectInfo } from './../../../models/map/inspectInfo.model';

declare var BMap;

@IonicPage()
@Component({
  selector: 'page-tz-index',
  templateUrl: 'tz-index.html',
})
export class TZIndexPage {
  dataSource: InspectInfo[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public geolocation: Geolocation,
    public apiService: ApiService,
    public alertCtrl: AlertController) { }

  ionViewDidLoad() {
  }

  inspectHistory() {
    this.navCtrl.push("InspectHistoryPage");
  }
}