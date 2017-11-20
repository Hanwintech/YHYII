import { Component } from '@angular/core';
import { Platform, ToastController } from 'ionic-angular';
import { Device } from '@ionic-native/device';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SqlService } from "./../services/sqlite.service";
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { InspectService } from './../services/inspect.service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = "LoginPage";
  area = null;
  scenery = null;
  ancientArchitecture = null;
  disInspectPosition = null;
  json = null;
  dataJson = { "inspectArea": null, "sceneryList": null, "listAncientArchitecture": null, "listDisInspectPosition": null };
  constructor(
    private platform: Platform,
    private toastCtrl: ToastController,
    private device: Device,
    private statusBar: StatusBar,
    private sqlService: SqlService,
    private inspectService: InspectService,
    private sqlite: SQLite,
    private splashScreen: SplashScreen
  ) {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.sqlite.echoTest().then(res => {
     
      }, (error) => {
        return;
      });


    });
  }
}
