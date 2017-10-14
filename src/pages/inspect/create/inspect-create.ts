import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { IonicPage, NavParams,NavController,MenuController,PopoverController ,ModalController,Platform} from 'ionic-angular';
import { InspectMorePage } from '../more/inspect-more';
import { BackButtonService } from "./../../../services/backButton.service";
import { SqlService } from "./../../../services/sqlite.service";


@IonicPage()
@Component({
  selector: 'page-inspect-create',
  templateUrl: 'inspect-create.html',
})

export class InspectCreatePage {
  @ViewChild('fileInput') fileInput;
  @ViewChild('panel') panel: ElementRef;
  menuList=[];
  structureTaiMing=[];
  structureDaliMu=[];
  titleName = "涵虚牌楼";
  //itemCheckBox的变量控制
  itemCheckBox=true;
  disPosition={};
  first;
  second;
  third;
  jsonStr;
  constructor(
    public navCtrl: NavController,
    public menuCtrl:MenuController,
    public navParams: NavParams,
    private modalCtrl: ModalController,
    public backButtonService: BackButtonService,
    private sqlService: SqlService,
    private platform: Platform,
    public popoverCtrl: PopoverController) {

  }
  ionViewDidEnter(){
   // this.menuCtrl.toggle("tzCreateMenu");

  this.getData();

  }
 
  getData(){
    this.sqlService.getSelectData('select * from DisInspectPosition where PID="0"').subscribe(res1=>{
        this.first = res1;
        for(let i=0;i<this.first.length;i++){
          this.sqlService.getSelectData('select * from DisInspectPosition where PID="'+this.first[i].ID+'"').subscribe(res2=>{
              this.second = res2;
              for(let j=0;j<this.second.length;j++){
                 if(this.second[i].type == 1){
                    this.sqlService.getSelectData('select isRepaired from DiseaseRecord where InspectionPositionID="'+this.third[i].ID+'" and ancientArcID ="'+this.navParams.data+'"  ').subscribe(res4=>{
                      if(res4 != null){
                          this.jsonStr += "{key:" + this.third[i].Name + "," + "value:" + res4[0] + "},";
                      }else{
                          this.jsonStr += "{key:" + this.third[i].Name + "," + "value:0},";
                      }
                    })
                 }else{
                    this.sqlService.getSelectData('select * from DisInspectPosition where PID="'+this.first[i].ID+'"').subscribe(res3=>{
                      this.third = res3;//沉降
                      for(let k=0;k<this.third.length;k++){
                          this.sqlService.getSelectData('select isRepaired from DiseaseRecord where InspectionPositionID="'+this.third[i].ID+'" and ancientArcID ="'+this.navParams.data+'"  ').subscribe(res4=>{
                            if(res4 != null){
                                this.jsonStr += "{key:" + this.third[i].Name + "," + "value:" + res4[0] + "},";
                            }else{
                                this.jsonStr += "{key:" + this.third[i].Name + "," + "value:0},";
                            }
                          })
                      }
                    })
                 }
                 //去掉末尾逗号
              }
              this.jsonStr += "key:" + this.second[i].Name + "," + "value:[" + this.jsonStr + "],";
              this.jsonStr += "[key:" + this.first[i].Name + "," + "value:[" + this.jsonStr + "]]";
          })
        }
        console.log(this.jsonStr);
    },(error)=>{

    });
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
  itemCheck(diseaseItem,nameId){

    

    let inspectDetail=this.modalCtrl.create("InspectDetailPage");
    inspectDetail.onDidDismiss(data=>{
   
    })
    inspectDetail.present();


  }

 
}