import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-tz-create6',
  templateUrl: 'tz-create6.html',
})
export class TzCreate6Page {
  public propertyId: string;
  show1:boolean;
  show2:boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TzCreate6Page');
  }

  showOrHide1(value) {
    this.show1 = value;
}

showOrHide2(value) {
    this.show2 = value;
}
}
