import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Device } from '@ionic-native/device';

import { GlobalCache } from './../../services/globalCache.service';
import { ApiService } from './../../services/api.service';
import { User, IUser } from "./../../models/user.model";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  auth = { account: "", password: "" };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public apiService: ApiService,
    public device: Device,
    public globalCache: GlobalCache,
    public storage: Storage,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController) {
    var logout = this.navParams.get("logout");
    this.storage.ready().then(() => {
      if (!logout) {
        this.storage.get("user")
          .then(user => {
            this.globalCache.currentUser = user;
            this.auth.account = user.account;
            this.auth.password = user.password;
            this.login();
          })
          .catch(error => { });
      } else {
        this.storage.remove("user")
          .then(data => {
            this.globalCache.currentUser = null;
            if (this.device.platform == 'iOS') {
              (<any>window).plugins.jPushPlugin.setAlias("");
            }
            if (this.device.platform == 'Android') {
              (<any>window).plugins.jPushPlugin.setAlias("");
              (<any>window).plugins.jPushPlugin.clearAllNotification()
            }
          })
          .catch(error => { });
      }
    });
  }

  login() {
    let loading = this.loadingCtrl.create({ dismissOnPageChange: true, content: '正在登录' });
    loading.present();

    let user: User = new User();
    user.account = this.auth.account;
    user.password = this.auth.password;
    this.globalCache.currentUser = user;
    this.apiService.getToken(this.auth.account, this.auth.password)
      .subscribe(res => {
        let user: IUser = <IUser>res;
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
        this.globalCache.currentUser = user;
        this.navCtrl.setRoot('TabsPage');
      },
      error => {
        loading.dismiss();
        let alert = this.alertCtrl.create({ title: '登录失败！', subTitle: '', buttons: ['确定'] });
        alert.present();
      });
  }
}