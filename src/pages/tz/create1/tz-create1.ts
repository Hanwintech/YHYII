import { Component } from '@angular/core';
import { NavController, Platform, IonicPage, AlertController, NavParams } from 'ionic-angular';
import { tzDataSource } from './../../../models/tz/tzDataSource.model';

@IonicPage()
@Component({
  selector: 'page-tz-create1',
  templateUrl: 'tz-create1.html',
})
export class TzCreate1Page {
  public propertyId: string;
  public dropdownDS: tzDataSource;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public alertCtrl: AlertController
  ) { }
}