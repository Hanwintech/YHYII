import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { tzDataSource } from './../../../models/tz/tzDataSource.model';
@IonicPage()
@Component({
  selector: 'page-tz-create5',
  templateUrl: 'tz-create5.html',
})
export class TzCreate5Page {
 public propertyId: string;
  public dropdownDS: tzDataSource;
  constructor(public navCtrl: NavController, public navParams: NavParams) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TzCreate5Page');
  }

}
