import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform, IonicPage, AlertController, NavParams,Events } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

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
  
  searchQuery: string = '';
 

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public geolocation: Geolocation,
    public apiService: ApiService,
    public alertCtrl: AlertController,
    public menuCtrl: MenuController,
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

  ionViewDidLoad() { 
  }
  ionViewDidEnter(){
      this.menuCtrl.enable(true, 'tzAreaMenu');
      this.menuCtrl.enable(false, 'tzcreateMenu');
  }
  itemSelected() {
    this.navCtrl.push("TZCreatePage");
  }

  select() {
    this.menuCtrl.open("tzListMenu");
  }
  closeSelect() {
    this.menuCtrl.close("tzListMenu");
    //this.viewCtrl.dismiss(this.dataSource);
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
