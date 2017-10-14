import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-tz-create8',
  templateUrl: 'tz-create8.html',
})
export class TzCreate8Page {
  propertyId: string;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TzCreate8Page');
  }

}
