import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-tz-create6',
  templateUrl: 'tz-create6.html',
})
export class TzCreate6Page {
  propertyId: string;
  show1:boolean;
  show2:boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TzCreate6Page');
  }

  showOrHide1(value) {
    if (value) {
      this.show1 = true;
    } else {
      this.show1 = false;
    }
  }
  showOrHide2(value) {
    if (value) {
      this.show2 = true;
    } else {
      this.show2 = false;
    }
  }
}
