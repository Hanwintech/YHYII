import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, App, ModalController, Events } from 'ionic-angular';
import { IHttpCommonResponse } from './../../models/httpCommonResponse.model';
import { inspectSearch } from './../../models/inspect/inspect-search.model';

@IonicPage()
@Component({
  selector: 'page-inspect-history-search',
  templateUrl: 'inspect-history-search.html',
})
export class InspectHistorySearchPage {
  dataSource = new inspectSearch();
  constructor(public navCtrl: NavController,
    public appCtrl: App, public navParams: NavParams,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController,
    public events: Events) {
  }
  statusEvent(value) {
    this.dataSource.status = value;
  }
  searchHistory() {
    this.viewCtrl.dismiss(this.dataSource);
  }
}
