import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, ModalController, Platform, IonicPage, AlertController, NavParams, Events } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { SqlService } from "./../../../services/sqlite.service";
import { ApiService } from './../../../services/api.service';
import { BaseRequest } from './../../../services/baseRequest';
import { IHttpCommonResponse } from './../../../models/httpCommonResponse.model';
import { InspectInfo } from './../../../models/map/inspectInfo.model';
import { MenuController } from 'ionic-angular';
declare var BMap;

@IonicPage()
@Component({
  selector: 'page-tz-index',
  templateUrl: 'tz-index.html',
})
export class TZIndexPage {
  dataSource = [];
  scenery;
  building;
  searchQuery: string = '';
  selectedScenery;
  titleName;
  selectedSceneryName;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public geolocation: Geolocation,
    private sqlService: SqlService,
    public apiService: ApiService,
    public alertCtrl: AlertController,
    public menuCtrl: MenuController,
    private modalCtrl: ModalController,
    public events: Events) {

    this.dataSource = [
      { id: "1", number: "A00001", name: "东宫门牌坊", area: "AAAAAAAA景区", function: "3", time: "2017-08-16", status: "1" },
      { id: "2", number: "A00001", name: "东宫门", area: "ABCD景区", function: "3", time: "", status: "2" },
      { id: "3", number: "A00001", name: "东宫门", area: "abcC景区", function: "2", time: "", status: "1" },
      { id: "4", number: "A00001", name: "东宫门", area: "DDDD景区", function: "1", time: "2017-08-16", status: "2" },
      { id: "5", number: "A00001", name: "东宫门", area: "AAAA景区", function: "3", time: "2017-08-16", status: "1" },
      { id: "6", number: "A00001", name: "东宫门", area: "AAAA景区", function: "4", time: "2017-08-16", status: "2" },
      { id: "7", number: "A00001", name: "东宫门", area: "AAAA景区", function: "4", time: "2017-08-16", status: "1" }];


  }
  ionViewDidEnter() {
    this.menuCtrl.enable(true, 'tzAreaMenu');
    this.menuCtrl.enable(true, 'tzListMenu');
    console.log(this.navParams.data);
    this.sqlService.getSelectData('select * from Scenery where InspectAreaID="' + this.navParams.data.ID + '"').subscribe(res => {
      console.log(res);
      this.scenery = res;
      this.selectedScenery = this.scenery[0].Name;
      this.selectedSceneryName=this.scenery[0].Name;
      if (this.scenery[0].Name) {
        this.getBuilding(this.scenery[0].Name);
      }
    }, (error) => {
      console.log(error);
    })
    this.titleName=this.navParams.data.Name;
  }
  getBuilding(selectedName) {
    this.selectedScenery = selectedName;
    this.selectedSceneryName= selectedName;
    this.sqlService.getSelectData('select ancientName,ancientBelong,modifyTime, status from BuildingInfo where ancientBelong="' + selectedName + '" order by status ').subscribe(res => {  
      if(res){
        this.building = res;
      }
      else{
        let alert = this.alertCtrl.create({ title: '警告！', subTitle: '您还没有下载台账数据！请到设置页面下载台账数据！', buttons: ['确定'] });
        alert.present();
      }
    }, (error) => {
      console.log(error);
    })
    this.menuCtrl.close("tzAreaMenu");
  }
  itemSelected(selectedItem) {
    let inspectDetail = this.modalCtrl.create("TZCreatePage", { buildingName: selectedItem.ancientName, sceneryName: this.selectedScenery });
    inspectDetail.onDidDismiss(data => {
      if (data != undefined) {
        selectedItem.status = "1";
      }
    })
    inspectDetail.present();
  }

  select() {
    this.menuCtrl.open("tzListMenu");
  }
  leftScenery() {
    this.menuCtrl.open("tzAreaMenu");
  }
  closeSelect() {
    this.menuCtrl.close("tzAreaMenu");
  }


  filterItems(ev: any) {
    this.dataSource = [
      { id: "1", number: "A00001", name: "东宫门牌坊", area: "AAAAAAAA景区", function: "3", time: "2017-08-16", status: "1" },
      { id: "2", number: "A00001", name: "东宫门", area: "ABCD景区", function: "3", time: "", status: "2" },
      { id: "3", number: "A00001", name: "东宫门", area: "abcC景区", function: "2", time: "", status: "1" },
      { id: "4", number: "A00001", name: "东宫门", area: "DDDD景区", function: "1", time: "2017-08-16", status: "2" },
      { id: "5", number: "A00001", name: "东宫门", area: "AAAA景区", function: "3", time: "2017-08-16", status: "1" },
      { id: "6", number: "A00001", name: "东宫门", area: "AAAA景区", function: "4", time: "2017-08-16", status: "2" },
      { id: "7", number: "A00001", name: "东宫门", area: "AAAA景区", function: "4", time: "2017-08-16", status: "1" }];
    let val = ev.target.value;
    if (val && val.trim() != '') {
      this.dataSource = this.dataSource.filter((tz) => {
        return (tz.number.toLowerCase().indexOf(val.toLowerCase()) > -1 || tz.name.toLowerCase().indexOf(val.toLowerCase()) > -1 || tz.area.toLowerCase().indexOf(val.toLowerCase()) > -1);
        // if (tz.number.toLowerCase().indexOf(val.toLowerCase()) > -1) {
        //   return true;
        // }
        // else if (tz.name.toLowerCase().indexOf(val.toLowerCase()) > -1) {
        //   return true;
        // }
        // else if (tz.area.toLowerCase().indexOf(val.toLowerCase()) > -1) {
        //   return true;
        // }
        // else
        //   return false;
      })
    }
  }

  // statusEvent(value){
  //   this.dataSource.status = value;
  // }
  // functionEvent(value) {
  //   this.dataSource.function = value;
  // }



}
