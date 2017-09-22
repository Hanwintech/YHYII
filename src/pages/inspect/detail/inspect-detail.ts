import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the InspectDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-inspect-detail',
  templateUrl: 'inspect-detail.html',
})
export class InspectDetailPage {
  radioBtn=false;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InspectDetailPage');
  }
  itemCheck(radioBtn){
    radioBtn=!radioBtn;
    }
    closePage(){
      this.navCtrl.pop();
    }
}
