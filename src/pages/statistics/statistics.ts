import { Component } from '@angular/core';
import { IonicPage,ModalController, NavController, NavParams } from 'ionic-angular';
import { SqlService } from "./../../services/sqlite.service";
import { InspectService } from './../../services/inspect.service';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { GlobalCache } from './../../services/globalCache.service';
@IonicPage()
@Component({
  selector: 'page-statistics',
  templateUrl: 'statistics.html',
})
export class StatisticsPage {
  sceneryArea;
  role;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private sqlService: SqlService,
    private sqlite: SQLite,
    private inspectService: InspectService,
    private modalCtrl: ModalController,
    private globalCache: GlobalCache
  ) { }

  statisticsChart(scenenryInfo) {
    this.navCtrl.push("InspectIndexPage", scenenryInfo);
    //this.navCtrl.push("TZIndexPage", scenenryInfo);
    // if(this.role="1"){
    //   let inspectDetail = this.modalCtrl.create("TzCreate1Page");
    //   inspectDetail.onDidDismiss(data => {
    //   })
    //   inspectDetail.present(); 
    // }
    // else{
    //   //this.navCtrl.push("InspectIndexPage", scenenryInfo);
    // }
  }

  ionViewDidEnter() {
    this.sqlite.echoTest().then((res) => {
      this.sqlService.getSelectData("select * from Area order by ID ").subscribe(res => {
        console.log(res);
        this.sceneryArea=res;
      }, (error) => {
        console.log(error);
      });
    }, (error) => {
      console.log(error);
    })
  }

}
