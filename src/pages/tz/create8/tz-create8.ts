import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { tzDataSource } from './../../../models/tz/tzDataSource.model';
@IonicPage()
@Component({
  selector: 'page-tz-create8',
  templateUrl: 'tz-create8.html',
})
export class TzCreate8Page {
  public propertyId: string;
  show1:boolean;
  show2:boolean;
  public dropdownDS: tzDataSource;
  constructor(public navCtrl: NavController, public navParams: NavParams) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TzCreate8Page');
  }
  showOrHide1(value) {
    this.show1 = value;
}

showOrHide2(value) {
    this.show2 = value;
}
}
