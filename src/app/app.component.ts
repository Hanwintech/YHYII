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
      this.sqlite.echoTest().then(res=>{
        this.inspectService.getDiseaseInspection().subscribe((res) => {
          console.log(res);
          this.json = {
            "structure": {
              "tables": {
                "Area": "(Description,ID,Name)",
                "Scenery": "(Description,ID,InspectAreaID,Name,XOrder)",
                "DisInspectPosition": "(ID,PID,PositionName,Type,XOrder)",
                "AncientArchitecture": "(ID,Name,SceneryName)",
                "DiseaseRecord": "(InspectionPositionID,ancientArcID,diseaseLevel,inspectDescription,inspectPerson,inspectTime,isRepaired,location,picUrl,recordId,repairDescription,respairTime,workType)"
              }
            },
            "data": {
              "inserts": {
                "Area": JSON.parse(res[0]),
                "Scenery": JSON.parse(res[1]),
                "DisInspectPosition": JSON.parse(res[2]),
                "AncientArchitecture": JSON.parse(res[3]),
                "DiseaseRecord": JSON.parse(res[4]),
              }
            }
          };
          this.sqlService.initialData(this.json);
        }, (error) => {
          console.log(error);
        });
      },(error)=>{
        return;
      });


    });
  }

}
