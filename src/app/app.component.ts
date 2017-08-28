import { Component } from '@angular/core';
import { Platform, ToastController } from 'ionic-angular';
import { Device } from '@ionic-native/device';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = "LoginPage";

  constructor(
    private platform: Platform,
    private toastCtrl: ToastController,
    private device: Device,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen
  ) {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      if (this.device.platform == 'Android' || this.device.platform == 'iOS') {
        (<any>window).plugins.jPushPlugin.init();
        (<any>window).plugins.jPushPlugin.getRegistrationID(function (data) { });

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
