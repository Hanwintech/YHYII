import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform, IonicPage, AlertController, NavParams, MenuController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { ApiService } from './../../../services/api.service';
import { BaseRequest } from './../../../services/baseRequest';
import { IHttpCommonResponse } from './../../../models/httpCommonResponse.model';
import { InspectInfo } from './../../../models/map/inspectInfo.model';
import { SqlService } from "./../../../services/sqlite.service";
import { InspectService } from './../../../services/inspect.service';

declare var BMap;

@IonicPage()
@Component({
  selector: 'page-inspect-index',
  templateUrl: 'inspect-index.html',
})
export class InspectIndexPage {
  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('header') header;
  scenery;
  building;
  titleName;
  selectedSceneryName;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    private sqlService: SqlService,
    private inspectService: InspectService,
    public geolocation: Geolocation,
    public apiService: ApiService,
    public alertCtrl: AlertController,
    public menuCtrl: MenuController) {

  }


  inspectHistory() {

  }
  ionViewDidEnter() {
    this.menuCtrl.enable(false, 'tzAreaMenu');
    this.menuCtrl.enable(false, 'tzcreateMenu');
    this.menuCtrl.enable(true, 'inspectListMenu');
    this.sqlService.getSelectData('select * from Scenery where InspectAreaID="' + this.navParams.data.ID + '"').subscribe(res => {
      this.scenery = res;
      this.getBuilding(this.scenery[0].Name);
      this.selectedSceneryName=this.scenery[0].Name;
    }, (error) => {
      console.log(error);
    })
    this.titleName = this.navParams.data.Name;
  }
  select() {
    //this.menuCtrl.isOpen("inspectListMenu");
    this.menuCtrl.open("inspectListMenu");
  }

  getBuilding(selectedName) {
    this.selectedSceneryName=selectedName;
    this.sqlService.getSelectData('select * from AncientArchitecture where SceneryName="' + selectedName + '"').subscribe(res => {
      this.building = res;
    }, (error) => {
      console.log(error);
    })
  }
  openPage(selectedName) {
    this.getBuilding(selectedName);
    this.menuCtrl.close("inspectListMenu");
  }
  openCreatePage(selectedItem) {
    this.navCtrl.push("InspectCreatePage", selectedItem);
  }

}
