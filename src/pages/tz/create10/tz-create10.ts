import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { tzDataSource } from './../../../models/tz/tzDataSource.model';
@IonicPage()
@Component({
  selector: 'page-tz-create10',
  templateUrl: 'tz-create10.html',
})
export class TzCreate10Page {
  public propertyId: string;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TzCreate10Page');
  }

}
