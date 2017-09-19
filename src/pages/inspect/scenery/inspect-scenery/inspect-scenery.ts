import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,MenuController } from 'ionic-angular';

/**
 * Generated class for the InspectSceneryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-inspect-scenery',
  templateUrl: 'inspect-scenery.html',
})
export class InspectSceneryPage {
  menuList = [];
  scenery = [];
  scenery1 = [];
  titleName = "巡检一区";
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public menuCtrl:MenuController) {
    this.menuList = [
      { id: "1", name: "东宫门景区" },
      { id: "2", name: "仁寿殿景区" },
      { id: "3", name: "德和园景区" },
      { id: "4", name: "紫气东来城关" },
      { id: "5", name: "谐趣园景区" },
      { id: "6", name: "霁清轩景区" },
      { id: "7", name: "眺远斋景区" },
      { id: "8", name: "老文物库" },
    ];
    this.scenery = [
      { id: "01", name: "涵虚牌楼", parentName: "东宫门景区", inspectTime: "2017-06-06" },
      { id: "02", name: "影壁", parentName: "东宫门景区", inspectTime: "2017-06-06" },
      { id: "03", name: "东宫门", parentName: "东宫门景区", inspectTime: "2017-06-06" },
      { id: "04", name: "北朝房", parentName: "东宫门景区", inspectTime: "2017-06-06" },
      { id: "05", name: "南朝房", parentName: "东宫门景区", inspectTime: "" },
      { id: "06", name: "北罩门", parentName: "东宫门景区", inspectTime: "" },
      { id: "07", name: "南罩门", parentName: "东宫门景区", inspectTime: "" },
      { id: "08", name: "外围墙", parentName: "东宫门景区", inspectTime: "" },
    ];
    this.scenery1 = [
      { id: "01", name: "涵虚牌楼1", parentName: "仁寿殿景区", inspectTime: "2017-06-06" },
      { id: "02", name: "影壁1", parentName: "仁寿殿景区", inspectTime: "2017-06-06" },
      { id: "03", name: "东宫门1", parentName: "仁寿殿景区", inspectTime: "2017-06-06" },
      { id: "04", name: "北朝房1", parentName: "仁寿殿景区", inspectTime: "2017-06-06" },
      { id: "05", name: "南朝房1", parentName: "仁寿殿景区", inspectTime: "" },
      { id: "06", name: "北罩门1", parentName: "仁寿殿景区", inspectTime: "" },
      { id: "07", name: "南罩门1", parentName: "仁寿殿景区", inspectTime: "" },
      { id: "08", name: "外围墙1", parentName: "仁寿殿景区", inspectTime: "" },
    ];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InspectSceneryPage');
  }
  inspectMenu() {
    this.menuCtrl.toggle("inspectMenuPage");

  }
  openPage(selectedId) {
    if (selectedId == 2) {
      this.scenery = this.scenery1;
    }
    else {
      this.scenery = this.scenery;
    }
    this.inspectMenu();
  }
  openCreatePage(selectedId){
    
  }
}
