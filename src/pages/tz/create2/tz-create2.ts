import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { tzDataSource } from './../../../models/tz/tzDataSource.model';
@IonicPage()
@Component({
  selector: 'page-tz-create2',
  templateUrl: 'tz-create2.html',
})
export class TzCreate2Page {
  public propertyId: string;
  public dropdownDS: tzDataSource;
  constructor(public navCtrl: NavController, public navParams: NavParams) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TzCreate2Page');
  }

}
