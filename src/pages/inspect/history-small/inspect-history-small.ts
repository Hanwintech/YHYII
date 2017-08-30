import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { InspectService } from './../../../services/inspect.service';
import { IHttpCommonResponse } from './../../../models/httpCommonResponse.model';

@IonicPage()
@Component({
  selector: 'page-inspect-history-small',
  templateUrl: 'inspect-history-small.html',
})
export class InspectHistorySmallPage {
  dataSource;
  propertyName: string;
  showHide = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private inspectService: InspectService,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController, ) {
  }

  ionViewDidEnter() {
    this.propertyName = this.navParams.data.name
    this.inspectService.getPositionList(this.navParams.data.id)
      .subscribe(res => {
        let list = res as IHttpCommonResponse<Position[]>
        this.dataSource = list.data;
        if ((this.navParams.data.status == "5" && !this.dataSource[0].isSubmit)|| (this.navParams.data.status == "4" && !this.dataSource[0].isSubmit))
        { this.showHide = true; }
      },
      error => {
        alert(error);
      });
  }
  itemSelected(item) {
    if ((this.navParams.data.status == "5" && !this.dataSource[0].isSubmit) || (this.navParams.data.status == "4" && !this.dataSource[0].isSubmit)) {
      this.navCtrl.push("InspectCreatePage", item.id);
    }
    else {
      this.navCtrl.push("InspectViewPage", item);
    }
  }
  submit() {
    this.inspectService.getsubmitInspect(this.navParams.data.id)
      .subscribe(res => {
        if (res.data == 2) {
          let toast = this.toastCtrl.create({
            message: '提交成功！',
            cssClass: 'background:#ddd;',
            duration: 1000
          });
          toast.present();
          this.showHide = false;
          this.navCtrl.pop();
        }
        else if (res.data == 1) {
          this.showHide = true;
          let alert = this.alertCtrl.create({
            title: '提示',
            subTitle: "巡查点未完成，请巡查完再提交数据！",
            buttons: ['确定']
          });
          alert.present();
        }
        else {
          alert("提交失败！");
        }
      }, error => {
        alert("提交失败！");
      });

  }

}
