import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { tzDataSource } from './../../../models/tz/tzDataSource.model';
@IonicPage()
@Component({
  selector: 'page-tz-create3',
  templateUrl: 'tz-create3.html',
})
export class TzCreate3Page {
  public propertyId: string;
  show1: boolean;
  show2: boolean;
  show3: boolean;
  public dropdownDS: tzDataSource;
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
      this.show1 = value;
  }

  showOrHide2(value) {
      this.show2 = value;
  }
  showOrHide3(value) {
    this.show3 = value;
  }
}
