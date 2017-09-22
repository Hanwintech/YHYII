import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-tz-create3',
  templateUrl: 'tz-create3.html',
})
export class TzCreate3Page {
  propertyId: string;
  show1: boolean;
  show2: boolean;
  show3: boolean;
  // dataSource=[];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // this.dataSource = [
    //   { ytvalue: "true"},
    //   { ytvalue: "true"},
    //   { ytvalue: "3"},
    //   { ytvalue: "4" },
    //   { ytvalue: "5" },
    //   { ytvalue: "6" },
    //   { ytvalue: "7" }];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TzCreate3Page');
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
  showOrHide3(value) {
    if (value) {
      this.show3 = true;
    } else {
      this.show3 = false;
    }
  }
}
