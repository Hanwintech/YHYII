import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { tzDataSource } from './../../../models/tz/tzDataSource.model';
@IonicPage()
@Component({
  selector: 'page-tz-create11',
  templateUrl: 'tz-create11.html',
})
export class TzCreate11Page {
  public  propertyId: string;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TzCreate11Page');
  }

}
