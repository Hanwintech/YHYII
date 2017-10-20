import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SqlService } from "./../../services/sqlite.service";
import { InspectService } from './../../services/inspect.service';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
@IonicPage()
@Component({
  selector: 'page-statistics',
  templateUrl: 'statistics.html',
})
export class StatisticsPage {
  sceneryArea;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private sqlService: SqlService,
    private sqlite: SQLite,
    private inspectService: InspectService,
  ) { }

  statisticsChart(scenenryInfo) {
    this.navCtrl.push("InspectIndexPage", scenenryInfo);
    //this.navCtrl.push("InspectDetailPage",{ID:3123,ancientArcID:32131});
  }

  ionViewDidEnter() {
    this.sqlite.echoTest().then((res) => {
      this.sqlService.getSelectData("select * from Area").subscribe(res => {
        this.sceneryArea=res;
      }, (error) => {
        console.log(error);
      });
    }, (error) => {
      console.log(error);
    })
  }

}
