import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SqlService } from "../../services/sqlite.service";

@IonicPage()
@Component({
  selector: 'page-search-main',
  templateUrl: 'search-main.html',
})
export class SearchMainPage {
  dataSource;
  isHaveContent;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private sqlService: SqlService) {

  }

  ionViewDidLoad() {
    let selectStr = "select * from SelectData where "
    let paraData = this.navParams.data;
    let tempStr = "";
    if (paraData.inspectArea) {
      tempStr = 'and AreaID="' + paraData.inspectArea + '"';
    }
    if (paraData.inspectScenery) {
      tempStr += 'and SceneryName="' + paraData.inspectScenery + '"';
    }
    if (paraData.ancientName) {
      tempStr += 'and AncientID="' + paraData.ancientName + '"';
    }
    if (paraData.workType) {
      tempStr += 'and WorkType="' + paraData.workType + '"';
    }
    if (paraData.inspectSTime) {
      tempStr += 'and InspectTime > "' + paraData.inspectSTime.replace(/-/g, "/") + '"';
    }
    if (paraData.inspectETime) {
      tempStr += 'and InspectTime < "' + paraData.inspectETime.replace(/-/g, "/") + '"';
    }
    selectStr = selectStr + tempStr.substr(4, tempStr.length);
    this.sqlService.getSelectData(selectStr).subscribe((res) => {
      if (res.length > 0) {
        this.dataSource = res;
        this.isHaveContent=true;
      }
      else{
       this.isHaveContent=false;
      }

    }, (error) => {
      console.log(error);
    });
  }

  openInspect(item) {
    this.navCtrl.push("SearchViewPage", item);
  }
}
