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
                "DiseaseRecord": "(InspectionPositionID,ancientArcID,diseaseLevel,inspectDescription,inspectPerson,inspectTime,isRepaired,location,picUrl,recordId,repairDescription,respairTime,workType)",
                "Tz":`(id,status,date,_01bh,_01mc,_01jzmj,_01ssjq,_01jglx,_01jzxs,_01jzgn,_01sjnd,_01xcnd,_01zhxssj,_02pmxz,_02lt,
_02bs,_02ql,_02zwl,_02hl,_02mk,_02tmkcc,_02js,_02tjscc,_03tjcl,_03tjxs,_03tjgd,_03dmcl,_03dmzf,_03yt,_03ytlglb,_03tj,_03tjzs,_03bgs,
_03bgssl,_04cl,_04qsqf,_04xjqf,_04xjgd,_05ljcl,_05ljxs,_05yzzj,_05ttsl,_06xydg,_06dkcc,_06ms,_06jkcs,_06ztkcs,_06pskcs,_06sydg,_06dkcc2,
_06ms2,_06jkcs2,_06ztkcs2,_06pskcs2,_07gslj,_07gscl,_07fm,_07lccl,_07yc,_07ycxz,_07yzjlg,_07dgmz,_07zdmz,_07th,_08xjzz,_08ljch,_08ljchlx,
_08thch,_08thchlx,_09wdxs,_09wmlx,_09llwys,_09jbys,_09ws,_09xrzs,_09zssl,_09qtgj,_09fcxpgd,_09zjgd,_10gjbz,_11wtms)`
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
