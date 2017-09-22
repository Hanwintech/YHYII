import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ViewController} from 'ionic-angular';

/**
 * Generated class for the InspectMorePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-inspect-more',
  templateUrl: 'inspect-more.html',
})
export class InspectMorePage {
listMore=[];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,) {
    this.listMore=[
      {id:"01",name:"台明"},
      {id:"02",name:"大木构架"},
      {id:"03",name:"木装修"},
      {id:"04",name:"墙体"},
      {id:"05",name:"屋面"},
    ];
  }

  openCreatePage(itemId){
    this.viewCtrl.dismiss(itemId);
  }
}
