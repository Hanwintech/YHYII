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
  menuList;
  scenery;
  building;
  titleName = "巡检一区";
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
    this.sqlService.getSelectData('select * from Scenery where InspectAreaID="' + this.navParams.data + '"').subscribe(res => {
      this.scenery = res;
      console.log(this.scenery[0].Name);
      this.getBuilding(this.scenery[0].Name);
    }, (error) => {
      console.log(error);
    })


  }
  select() {
    this.menuCtrl.toggle("inspectListMenu");
  }

  getBuilding(selectedName) {
    this.sqlService.getSelectData('select * from AncientArchitecture where SceneryName="' + selectedName + '"').subscribe(res => {
      this.building = res;
      console.log(this.building);
    }, (error) => {
      console.log(error);
    })
  }
  openPage(selectedName) {
    this.getBuilding(selectedName);
    this.menuCtrl.toggle("inspectListMenu");
  }
  openCreatePage(selectedId) {
    this.navCtrl.push("InspectCreatePage");
  }

}
