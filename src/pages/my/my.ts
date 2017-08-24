import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { Platform, ActionSheetController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-my',
  templateUrl: 'my.html',
})
export class MyPage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private app: App,
    public platform: Platform,
    public actionSheetCtrl: ActionSheetController) {
  }
  
  exitMenu() {
    let actionSheet = this.actionSheetCtrl.create({
      title: '确定要退出登录吗？',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: '确认',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'checkmark' : null,
          handler: () => {
            this.app.getRootNav().setRoot("LoginPage", { logout: true });
          }
        }, {
          text: '取消',
          role: 'cancel',
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
          }
        }
      ]
    });
    actionSheet.present();
  }
}
 

