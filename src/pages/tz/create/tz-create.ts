import { Component, ViewChild, ViewContainerRef, ComponentFactory, ComponentRef, ComponentFactoryResolver } from '@angular/core';
import { NavController, Platform, IonicPage, MenuController, AlertController, NavParams, Content } from 'ionic-angular';
//import { TZCreatePage } from './tz-create';
import { TzCreate1Page } from './../create1/tz-create1';
import { TzCreate2Page } from './../create2/tz-create2';
import { TzCreate3Page } from './../create3/tz-create3';
import { TzCreate4Page } from './../create4/tz-create4';
import { TzCreate5Page } from './../create5/tz-create5';
import { TzCreate6Page } from './../create6/tz-create6';
import { TzCreate7Page } from './../create7/tz-create7';
import { TzCreate8Page } from './../create8/tz-create8';
import { TzCreate9Page } from './../create9/tz-create9';
import { TzCreate10Page } from './../create10/tz-create10';
import { TzCreate11Page } from './../create11/tz-create11';
import { tzDataSource } from './../../../models/tz/tzDataSource.model';
import { SqlService } from "./../../../services/sqlite.service";

@IonicPage()
@Component({
  selector: 'page-tz-create',
  templateUrl: 'tz-create.html',
})
export class TZCreatePage {
  propertyId: string;
  menuList = [];
  selectedMenuId = "";
  aa = "cavav";
  public dropdownDS: tzDataSource;
  lt: boolean;
  dataSource;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    private sqlService: SqlService,
    public alertCtrl: AlertController,
    public resolver: ComponentFactoryResolver,
    public menuCtrl: MenuController
  ) {
  }
  ionViewDidEnter() {
    this.sqlService.getSelectData('select * from BuildingInfo where ancientName="' + this.navParams.data + '"').subscribe(res => {
      this.dataSource = res[0];
      console.log(res);
    }, (error) => {
      console.log(error);
    })

    //获取下拉框数据源
    this.dropdownDS = new tzDataSource();
    this.dropdownDS._01jglx = ["木", "砖木", "石木", "砖石", "铜铸仿木", "其他类型"]; // 结构类型
    this.dropdownDS._01jzgn = ["办公用房", "监控室", "游览建筑", "原状陈设", "商业", "厕所", "库房", "其他"]; // 建筑功能
    this.dropdownDS._02pmxz = ["矩形", "六角形", "八角形", "其他"];//平面形状
    this.dropdownDS._02mk = ["1间", "2间", "3间", "5间", "7间", "9间", "11间", "其他"];//面阔
    this.dropdownDS._02js = ["1进", "2进", "3进", "4进", "5进", "其他"];//进深
    this.dropdownDS._03tjcl = ["石", "砖", "砖石", "其他"];//台基材料
    this.dropdownDS._03tjxs = ["普通", "须弥座", "无台基", "其他"];//台基形式
    this.dropdownDS._03dmcl = ["方砖", "石板", "条砖", "夯土地面", "其他"];//地面材料
    this.dropdownDS._03dmzf = ["细墁", "淌白", "糙墁", "其他"];//地面做法
    this.dropdownDS._04cl = ["砖", "琉璃", "土坯", "石"];//材料
    this.dropdownDS._04qsqf = ["丝缝", "淌白", "糙砌", "其他"];//墙身砌法
    this.dropdownDS._04xjqf = ["干摆", "丝缝", "淌白", "糙砌", "其他"];//下碱砌法
    this.dropdownDS._05ljcl = ["木", "石", "铜"];//梁架材料
    this.dropdownDS._05ljxs = ["抬梁式", "穿斗式", "混合式", "其他式"];//梁架形式
    this.dropdownDS._07gscl = ["木", "铜"];//格扇材料
    this.dropdownDS._07lccl = ["木", "削割砖", "琉璃", "其他"];//槛窗材料
    this.dropdownDS._07ycxz = ["方形 ", "圆型 ", "拱券型", "其他"];//牖窗形状
    this.dropdownDS._08xjzz = ["桐油", "红褐色", "绿色", "栏杆色", "黑色"];//下架柱子
    this.dropdownDS._08ljchlx = ["和玺", "旋子", "苏式", "海墁", "其他"];//彩画类型
    this.dropdownDS._08thchlx = ["团龙", "翔凤", "团鹤", "花卉", "其他"];//彩画类型
    this.dropdownDS._09wdxs = ["重檐庑殿", "重檐歇山", "单檐庑殿", "单檐歇山", "悬山", "硬山", "攒尖", "盝顶", "其他"];//屋顶形式
    this.dropdownDS._09wmlx = ["合瓦", "筒板瓦", "削割瓦", "铜瓦", "琉璃瓦"];//瓦面类型
    this.dropdownDS._09llwys = ["黄", "绿", "蓝", "其他"];//琉璃瓦颜色
    this.dropdownDS._09jbys = ["黄", "绿", "蓝", "其他"];//剪边颜色
  }

  submitData() {
    let myDate = new Date();
    this.dataSource.status = "1";
    this.dataSource.modifyTime = myDate.toLocaleDateString();
    for(var item in this.dataSource){
      if(this.dataSource[item]=="null"){
        this.dataSource[item]="";
        console.log(111);
      }
    }
    console.log(this.navParams.data);
    console.log(this.dataSource);
    let jsonData = {
      "data": {
        "updates": {
          "BuildingInfo": [
            {
              "set": this.dataSource,
              "where": { "ancientName": this.navParams.data }
            }
          ],
        }
      }
    };


    this.sqlService.initialData(jsonData).subscribe((res) => {
      console.log(res);
    }, (error) => { });
    this.sqlService.getSelectData('select * from BuildingInfo where status="1"').subscribe((res) => {
      console.log(res);
    }, (error) => { });
  }
  toggleMenu() {
    this.menuCtrl.toggle("tzCreateMenu");
  }

  enabletzCreateMenu() {
    this.menuCtrl.enable(true, 'tzCreateMenu');
    this.menuCtrl.enable(false, 'tzAreaMenu');
  }

}