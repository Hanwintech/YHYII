import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { tzDataSource } from './../../../models/tz/tzDataSource.model';
@IonicPage()
@Component({
  selector: 'page-tz-create7',
  templateUrl: 'tz-create7.html',
})
export class TzCreate7Page {
  public propertyId: string;
  show1:boolean;

  public dropdownDS: tzDataSource;
  constructor(public navCtrl: NavController, public navParams: NavParams) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TzCreate7Page');
  }
  showOrHide1(value) {
    this.show1 = value;
}


}
