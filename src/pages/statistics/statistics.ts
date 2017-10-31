import { Component } from '@angular/core';
import { IonicPage, ModalController, AlertController, NavController, NavParams } from 'ionic-angular';
import { SqlService } from "./../../services/sqlite.service";
import { InspectService } from './../../services/inspect.service';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { GlobalCache } from './../../services/globalCache.service';
import { Storage } from '@ionic/storage';
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
    private storage: Storage,
    private alertCtrl: AlertController,
    private globalCache: GlobalCache
  ) { }

  statisticsChart(scenenryInfo) {
   // this.navCtrl.push("InspectIndexPage", scenenryInfo)
    if(this.role=="1"){
      this.navCtrl.push("TZIndexPage", scenenryInfo);
    }
    else if(this.role=="2"){
      this.navCtrl.push("InspectIndexPage", scenenryInfo);
    }
  }
  ionViewDidEnter() {
    this.storage.ready().then(() => {
      this.globalCache.init(() => {
        let user = this.globalCache.user;
        this.role = this.globalCache.user.role;
        if (this.role == "") {
          let alert = this.alertCtrl.create({ title: '提示', subTitle: '该账号并无查看数据的权限，请登录正确的账号！', buttons: ['确定'] });
          alert.present();
          return;
        }
        else if(this.role.length>1){
          let alert = this.alertCtrl.create({ title: '提示', subTitle: '此账号配置错误，拥有两个权限，请联系管理员后获取新账号再登录', buttons: ['确定'] });
          alert.present();
          return;
        }
        else{
          this.sqlite.echoTest().then((res) => {
            this.sqlService.getSelectData("select * from Area order by ID ").subscribe(res => {
              console.log(res);
              this.sceneryArea = res;
            }, (error) => {
              console.log(error);
            });
          }, (error) => {
            console.log(error);
          })
        }
      });
    });

  }

}
