import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform, IonicPage, AlertController, NavParams } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
declare var BMap;

@IonicPage()
@Component({
  selector: 'page-inspect-history-search',
  templateUrl: 'inspect-history-search.html',
})
export class InspectHistorySearchPage {
 

  searchQuery: string = '';
  dataSource = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public alertCtrl: AlertController,
    public menuCtrl: MenuController) {
  }



  ionViewDidLoad() {
  }
  select() {
    this.menuCtrl.open("tzListNav");
  }
}
