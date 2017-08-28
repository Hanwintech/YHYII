import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Device } from '@ionic-native/device';

import { GlobalCache } from './../../services/globalCache.service';
import { ApiService } from './../../services/api.service';
import { User } from "./../../models/user.model";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  auth = { account: "", password: "" };

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private apiService: ApiService,
    private device: Device,
    private globalCache: GlobalCache,
    private storage: Storage,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {
    this.storage.ready().then(() => {
      this.globalCache.init(() => {
        if (this.navParams.get("logout")) {
          this.globalCache.clearUser()
            .then(data => {
              if (this.device.platform == 'iOS') {
                (<any>window).plugins.jPushPlugin.setAlias("");
              } else if (this.device.platform == 'Android') {
                (<any>window).plugins.jPushPlugin.setAlias("");
                (<any>window).plugins.jPushPlugin.clearAllNotification()
              }
            });
        } else {
          let user = this.globalCache.user;
          if (user) {
            this.login(user);
          }
        }
      });
    });
  }

  private login(u: User) {
    let loading = this.loadingCtrl.create({ dismissOnPageChange: true, content: '正在登录' });
    loading.present();
    if (u) {
      this.navCtrl.setRoot('TabsPage');
    } else {
      this.apiService.getToken(this.auth.account, this.auth.password)
        .subscribe(res => {
          let user: User = <User>res;
          user.account = this.auth.account;
          user.password = this.auth.password;
          this.apiService.token = user.access_token;
          if (this.device.platform == 'Android' || this.device.platform == 'iOS') {
            (<any>window).plugins.jPushPlugin.setAlias([user.account],
              sucMsg => {
                //alert(sucMsg);
              },
              errMsg => {
                loading.dismiss();
                let alert = this.alertCtrl.create({ title: '推送服务注册失败！', subTitle: errMsg, buttons: ['确定'] });
                alert.present();;
              });
          }
          this.globalCache.cacheUser(user);
          this.navCtrl.setRoot('TabsPage');
        },
        error => {
          loading.dismiss();
          let alert = this.alertCtrl.create({ title: '登录失败！', subTitle: '', buttons: ['确定'] });
          alert.present();
        });
    }
  }
}