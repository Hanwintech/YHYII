import { Component } from '@angular/core';
import { Device } from '@ionic-native/device';
import { Platform, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ApiService } from './../services/api.service';
import { BaseRequest } from './../apis/baseRequest.api';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = 'LoginPage';

  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private toastCtrl: ToastController,
    private device: Device,
    private apiService: ApiService
  ) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      if (this.device.platform == 'Android' || this.device.platform == 'iOS') {
        (<any>window).plugins.jPushPlugin.init();
        (<any>window).plugins.jPushPlugin.getRegistrationID(function (data) {
          // if (data) {
          //   let request: BaseRequest = new BaseRequest();
          //   request.method = "Post";
          //   request.requestUrl = "/api/Users/Registration";
          //   request.requestBody = { "registrationID": data };
          //   this.apiService.sendApi(request).subscribe(
          //     res => { alert(res); });
          // }
        });

        document.addEventListener("jpush.receiveNotification", event => {
          let alertContent;
          if (this.device.platform == "Android") {
            alertContent = (<any>event).alert;
          } else {
            alertContent = (<any>event).aps.alert
          }
          let toast = this.toastCtrl.create({
            message: alertContent,
            duration: 3000,
            position: 'bottom'
          });
          toast.present();
        }, false);
      }
    });
  }
}
