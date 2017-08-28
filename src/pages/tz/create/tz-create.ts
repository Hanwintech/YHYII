import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform, IonicPage, AlertController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

import { ApiService } from './../../../services/api.service';
import { BaseRequest } from './../../../services/baseRequest';
import { IHttpCommonResponse } from './../../../models/httpCommonResponse.model';
import { InspectInfo } from './../../../models/map/inspectInfo.model';

@IonicPage()
@Component({
  selector: 'page-tz-create',
  templateUrl: 'tz-create.html',
})
export class TZCreatePage {
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public geolocation: Geolocation,
    public apiService: ApiService,
    public alertCtrl: AlertController) { }

  ionViewDidLoad() {
  }
}