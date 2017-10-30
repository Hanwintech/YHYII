import { Component, ViewChild } from '@angular/core';
import { IonicPage, Tabs, Platform,AlertController } from 'ionic-angular';
import { BackButtonService } from "../../services/backButton.service";
import { StatisticsPage } from './../statistics/statistics';
import { TZIndexPage } from './../tz/index/tz-index';
import { MyPage } from './../my/my';
import { GlobalCache } from './../../services/globalCache.service';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  tabRoots: Object[];
  role;
both;
  tab1Root = 'MyPage';
  tab2Root = 'StatisticsPage';
  tab3Root = 'StatisticsPage';
  @ViewChild('myTabs') tabRef: Tabs;
  constructor(
    public backButtonService: BackButtonService,
    private storage: Storage, 
    private globalCache: GlobalCache,
    private alertCtrl: AlertController,
    private platform: Platform) {
    }
    ionViewDidEnter() {
      this.storage.ready().then(() => {
        this.globalCache.init(() => {
          let user = this.globalCache.user;
          this.role = this.globalCache.user.role;
          if(this.role==""){
            let alert = this.alertCtrl.create({ title: '提示', subTitle: '该账号并无查看数据的权限，请登录正确的账号！', buttons: ['确定'] });
            alert.present();
          }
          if(this.role.length>1){
            this.both=true;
          }
        });
      });
    }
}
