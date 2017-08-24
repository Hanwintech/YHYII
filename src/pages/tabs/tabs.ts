import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  tab1Root = 'InspectPage';
  tab2Root = 'HandlePage';
  tab3Root = 'StatisticsPage';
  tab4Root = 'MyPage';

  constructor(public navCtrl: NavController, public navParams: NavParams) { }
}
