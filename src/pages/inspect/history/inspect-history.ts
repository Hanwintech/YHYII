import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, NavParams, ModalController } from 'ionic-angular';
import { InspectService } from './../../../services/inspect.service';
import{getPropertyListApi} from './../../../apis/inspect/getPropertyList.api'
import { IHttpCommonResponse } from './../../../models/httpCommonResponse.model';
import { Property } from './../../../models/inspect/property.model';


@IonicPage()
@Component({
  selector: 'page-inspect-history',
  templateUrl: 'inspect-history.html',
})
export class InspectHistoryPage {
  dataSource: Property[];
  inpectSearch = { inspectPosition: "", sTime: "", eTime: "", inspectPerson: "", status: "" }
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private loadingCtrl: LoadingController,
    private inspectService: InspectService,
    public modalCtrl: ModalController) {
  }

  ionViewDidEnter() {
    let loading = this.loadingCtrl.create({
      dismissOnPageChange: true,
      content: '正在加载数据，请稍等'
    });
    loading.present();
    this.inspectService.getPropertyList(this.inpectSearch)
      .subscribe(res => {
        let list = res as IHttpCommonResponse<Property[]>
        this.dataSource = list.data;
        loading.dismiss();
      },
      error => {
        alert(error);
      });
  }
  itemSelected(item) {
    this.navCtrl.push("InspectHistorySmallPage", item);
  }
  searchHistory() {
    let profileModal = this.modalCtrl.create("InspectHistorySearchPage");
    profileModal.onDidDismiss(data => {
      this.inpectSearch = data;
      let loading = this.loadingCtrl.create({
        dismissOnPageChange: true,
        content: '正在刷新，请稍等'
      });
      loading.present();
      this.inspectService.getPropertyList(data)
        .subscribe(res => {
          let list = res as IHttpCommonResponse<Property[]>
          this.dataSource = list.data;
          loading.dismiss();
        },
        error => {
          loading.dismiss();
          alert(error);
        });
    });
    profileModal.present();
  }
}
