import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-tz-create5',
  templateUrl: 'tz-create5.html',
})
export class TzCreate5Page {
  propertyId: string;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TzCreate5Page');
  }

}
