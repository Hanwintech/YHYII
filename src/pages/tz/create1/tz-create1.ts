import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform, IonicPage, AlertController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-tz-create1',
  templateUrl: 'tz-create1.html',
})
export class TZCreate1Page {
 
  lt: boolean;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public alertCtrl: AlertController
  ) { }
  
}