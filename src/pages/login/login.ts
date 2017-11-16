import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonicPage, ToastController, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Device } from '@ionic-native/device';
import { InspectService } from './../../services/inspect.service';
import { GlobalCache } from './../../services/globalCache.service';
import { ApiService } from './../../services/api.service';
import { User } from "./../../models/user.model";
import { SqlService } from "../../services/sqlite.service";

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
    private inspectService: InspectService,
    private device: Device,
    private globalCache: GlobalCache,
    private storage: Storage,
    private sqlService: SqlService,
    private loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) {
    this.storage.ready().then(() => {
      this.globalCache.init(() => {
        if (this.navParams.get("logout")) {
          this.globalCache.clearUser();
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
      this.inspectService.token = u.access_token;
      console.log( u.access_token);

    } else {
      this.apiService.getToken(this.auth.account, this.auth.password)
        .subscribe(res => {
          let user: User = <User>res;
          user.account = this.auth.account;
          user.password = this.auth.password;
          this.apiService.token = user.access_token;
          this.inspectService.token = user.access_token;
          this.globalCache.cacheUser(user);
          this.navCtrl.setRoot('TabsPage');
          this.inspectService.getDiseaseRecord().subscribe(res => { console.log(res); });
        },
        error => {
          if (error.status == 0) {
            loading.dismiss();
            let alert = this.alertCtrl.create({ title: '登录失败！', subTitle: '请在有网络的环境下进行登录！', buttons: ['确定'] });
            alert.present();
          }
          else {
            loading.dismiss();
            let alert = this.alertCtrl.create({ title: '登录失败！', subTitle: '', buttons: ['确定'] });
            alert.present();
          }
        });
    }
  }
}