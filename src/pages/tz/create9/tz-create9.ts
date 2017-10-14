import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-tz-create9',
  templateUrl: 'tz-create9.html',
})
export class TzCreate9Page {
  propertyId: string;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TzCreate9Page');
  }

}
