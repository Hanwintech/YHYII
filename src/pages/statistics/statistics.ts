import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-statistics',
  templateUrl: 'statistics.html',
})
export class StatisticsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) { }

  statisticsChart(chartType: number) {
    this.navCtrl.push("StatisticsChartPage", chartType);
  }
}
