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
  }

  ionViewDidEnter() {
    this.sqlite.echoTest().then((res) => {
      // let sql = "select * from Area"
      // this.sqlService.selectData(sql).subscribe(res => {
      //   console.log(res);
      //   console.log(22222);
      // }, (error) => {
      //   console.log(error);
      //   console.log(33333);
      // });


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
