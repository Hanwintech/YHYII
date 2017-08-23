import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HandleService } from './../../services/handle.service';
import { IHttpCommonResponse } from './../../models/httpCommonResponse.model';
import { Problem } from './../../models/handle/problem.model';
@IonicPage()
@Component({
  selector: 'page-urge-handle',
  templateUrl: 'urge-handle.html',
})
export class UrgeHandlePage {
  dataSource: Problem[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private handleService: HandleService) {
  }

  ionViewDidEnter() {
    this.handleService.getProblemList()
      .subscribe(res => {
        let list = res as IHttpCommonResponse<Problem[]>
        this.dataSource = list.data;
        console.log(this.dataSource);
        //console.log(this.dataSource);
      },
      error => {
        alert(error);
      });
  }


  AddInspect(item) {
    this.navCtrl.push("AddInpectHandlePage", item.id);
  }

  // logout() {
  //   this.app.getRootNav().setRoot("LoginPage", { logout: true });
  // }
}
