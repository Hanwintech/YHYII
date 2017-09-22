import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { IonicPage, NavParams,NavController,MenuController,PopoverController ,ModalController} from 'ionic-angular';
import { InspectMorePage } from '../more/inspect-more';

@IonicPage()
@Component({
  selector: 'page-inspect-create',
  templateUrl: 'inspect-create.html',
})

export class InspectCreatePage {
  @ViewChild('fileInput') fileInput;
  @ViewChild('panel') panel: ElementRef;
  menuList=[];
  structure=[];
  titleName = "涵虚牌楼";
  //itemCheckBox的变量控制
  itemCheckBox=true;
  constructor(
    public navCtrl: NavController,
    public menuCtrl:MenuController,
    private modalCtrl: ModalController,
    public popoverCtrl: PopoverController) {
    this.menuList = [
      { id: "1", name: "台明" },
      { id: "2", name: "大力构架" },
      { id: "3", name: "木装修" },
      { id: "4", name: "墙体" },
      { id: "5", name: "屋面" },
      { id: "6", name: "附属设施" }
    ];
    this.structure = [
      { id: "01", name: "地面基础",disease:[{key:"001",value:"沉降",checked:false},{key:"002",value:"位移",checked:false}]},
      { id: "02", name: "影壁" ,disease:[{key:"001",value:"沉降",checked:false},{key:"002",value:"位移",checked:false},{key:"001",value:"碎裂",checked:false},{key:"001",value:"碎裂",checked:false},{key:"001",value:"碎裂",checked:false},{key:"001",value:"碎裂",checked:false}]},
      { id: "03", name: "东宫门",disease:[{key:"001",value:"沉降",checked:false},{key:"002",value:"位移",checked:false},{key:"001",value:"碎裂",checked:false}]},
      { id: "04", name: "北朝房",disease:[{key:"001",value:"沉降",checked:false},{key:"002",value:"位移",checked:false},{key:"001",value:"碎裂",checked:false}]},
      { id: "05", name: "南朝房",disease:[{key:"001",value:"沉降",checked:false},{key:"002",value:"位移",checked:false},{key:"001",value:"碎裂",checked:false}] },
      { id: "06", name: "北罩门",disease:[{key:"001",value:"沉降",checked:false},{key:"002",value:"位移",checked:false},{key:"001",value:"碎裂",checked:false},{key:"001",value:"碎裂",checked:false},{key:"001",value:"碎裂",checked:false},{key:"001",value:"碎裂",checked:false},{key:"001",value:"碎裂",checked:false}] },
      { id: "07", name: "南罩门" ,disease:[{key:"001",value:"沉降",checked:false},{key:"002",value:"位移",checked:false},{key:"001",value:"碎裂",checked:false}]},
      { id: "08", name: "外围墙",disease:[{key:"001",value:"沉降",checked:false},{key:"002",value:"位移",checked:false},{key:"001",value:"碎裂",checked:false}]},
    ];
  }
  ionViewDidEnter(){
   // this.menuCtrl.toggle("tzCreateMenu");

  }
  menuMore(){
    let popover = this.popoverCtrl.create(InspectMorePage);
    popover.onDidDismiss(data=>{
      console.log(data);
    })
    popover.present();
  }

  leftMenu(){
    this.menuCtrl.toggle("inspectCreateMenu");
  }
  itemCheck(diseaseItem){
  
    let inspectDetail=this.modalCtrl.create("InspectDetailPage",diseaseItem);
    inspectDetail.onDidDismiss(data=>{
      diseaseItem.checked=!diseaseItem.checked;
    })
    inspectDetail.present();
  }
 
}