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

@IonicPage()
@Component({
  selector: 'page-tz-create',
  templateUrl: 'tz-create.html',
})
export class TZCreatePage {
  propertyId: string;
  componentRef: ComponentRef<TzCreate1Page>;
  @ViewChild("formContent", { read: ViewContainerRef }) container: ViewContainerRef;
  @ViewChild(Content) content: Content;
  menuList = [];
  selectedMenuId = "";
  public dropdownDS: tzDataSource;
  lt: boolean;
  relationship;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public alertCtrl: AlertController,
    public resolver: ComponentFactoryResolver,
    public menuCtrl: MenuController
  ) {
    this.menuList = [
      { id: "1", name: "基本信息" },
      { id: "2", name: "平面形制" },
      { id: "3", name: "台基地面" },
      { id: "4", name: "墙体墙面" },
      { id: "5", name: "构架形制" },
      { id: "6", name: "斗栱" },
      { id: "7", name: "装修形制" },
      { id: "8", name: "油饰彩画" },
      { id: "9", name: "屋顶瓦面" },
      { id: "10", name: "古建备注" },
      { id: "11", name: "问题描述" }];

      //获取下拉框数据源
      this.dropdownDS = new tzDataSource();
      this.dropdownDS._01jglx = ["木","砖木","石木","砖石","铜铸仿木","其他类型"]; // 结构类型
      this.dropdownDS._01jzgn = ["办公用房","监控室","游览建筑","原状陈设","商业","厕所","库房","其他"]; // 建筑功能
      this.dropdownDS._02pmxz = ["矩形","六角形","八角形","其他"];//平面形状
      this.dropdownDS._02mk = ["1间","2间","3间","5间","7间","9间","11间","其他"];//面阔
      this.dropdownDS._02js = ["1进","2进","3进","4进","5进","其他"];//进深
      this.dropdownDS._03tjcl = ["石","砖","砖石","其他"];//台基材料
      this.dropdownDS._03tjxs = ["普通","须弥座","无台基","其他"];//台基形式
      this.dropdownDS._03dmcl = ["方砖","石板","条砖","夯土地面","其他"];//地面材料
      this.dropdownDS._03dmzf = ["细墁","淌白","糙墁","其他"];//地面做法
      this.dropdownDS._04cl = ["砖","琉璃","土坯","石"];//材料
      this.dropdownDS._04qsqf = ["丝缝","淌白","糙砌","其他"];//墙身砌法
      this.dropdownDS._04xjqf = ["干摆","丝缝","淌白","糙砌","其他"];//下碱砌法
      this.dropdownDS._05ljcl = ["木","石","铜"];//梁架材料
      this.dropdownDS._05ljxs = ["抬梁式","穿斗式","混合式","其他式"];//梁架形式
      this.dropdownDS._07gscl = ["木","铜"];//格扇材料
      this.dropdownDS._07lccl = ["木","削割砖","琉璃","其他"];//槛窗材料
      this.dropdownDS._07ycxz = ["方形 ","圆型 ","拱券型","其他"];//牖窗形状
      this.dropdownDS._08xjzz = ["桐油","红褐色","绿色","栏杆色","黑色"];//下架柱子
      this.dropdownDS._08ljchlx = ["和玺","旋子","苏式","海墁","其他"];//彩画类型
      this.dropdownDS._08thchlx = ["团龙","翔凤","团鹤","花卉","其他"];//彩画类型
      this.dropdownDS._09wdxs = ["重檐庑殿","重檐歇山","单檐庑殿","单檐歇山","悬山","硬山","攒尖","盝顶","其他"];//屋顶形式
      this.dropdownDS._09wmlx = ["合瓦","筒板瓦","削割瓦","铜瓦","琉璃瓦"];//瓦面类型
      this.dropdownDS._09llwys = ["黄","绿","蓝","其他"];//琉璃瓦颜色
      this.dropdownDS._09jbys = ["黄","绿","蓝","其他"];//剪边颜色
  }
  submitData(){
    alert(this.relationship);
  }
  toggleMenu() {
    this.menuCtrl.toggle("tzCreateMenu");
  }

  enabletzCreateMenu() {
    this.menuCtrl.enable(true, 'tzCreateMenu');
    this.menuCtrl.enable(false, 'tzAreaMenu');
  }
  scrollTo(menuId) {
    if (menuId == "1") { this.content.scrollToTop(); }
    else if (menuId == "2") { this.content.scrollTo(0, 572.17, 300); }
    else if (menuId == "3") { this.content.scrollTo(0, 1132.14, 300); }
    else if (menuId == "4") { this.content.scrollTo(0, 1744.91, 300); }
    else if (menuId == "5") { this.content.scrollTo(0, 1988.1, 300); }
    else if (menuId == "6") { this.content.scrollTo(0, 2231.29, 300); }
    else if (menuId == "7") { this.content.scrollTo(0, 2896.85, 300); }
    else if (menuId == "8") { this.content.scrollTo(0, 3509.62, 300); }
    else if (menuId == "9") { this.content.scrollTo(0, 3805.6, 300); }
    else if (menuId == "10") { this.content.scrollTo(0, 4064.6, 300); }
    else if (menuId == "11") { this.content.scrollTo(0,  4423.6, 300); }
    this.selectedMenuId = menuId;
    this.toggleMenu();
  }

  ionViewDidLoad() {
    this.enabletzCreateMenu();

    this.selectedMenuId = this.menuList[0].id;
    {
      const factory: ComponentFactory<TzCreate1Page> = this.resolver.resolveComponentFactory(TzCreate1Page);
      let componentRef = this.container.createComponent(factory);
      componentRef.instance.propertyId = this.propertyId;
      componentRef.instance.dropdownDS = this.dropdownDS;
    }
    {
      const factory: ComponentFactory<TzCreate2Page> = this.resolver.resolveComponentFactory(TzCreate2Page);
      let componentRef = this.container.createComponent(factory);
      componentRef.instance.propertyId = this.propertyId;
      componentRef.instance.dropdownDS = this.dropdownDS;
    }
    {
      const factory: ComponentFactory<TzCreate3Page> = this.resolver.resolveComponentFactory(TzCreate3Page);
      let componentRef = this.container.createComponent(factory);
      componentRef.instance.propertyId = this.propertyId;
      componentRef.instance.dropdownDS = this.dropdownDS;
    }
    {
      const factory: ComponentFactory<TzCreate4Page> = this.resolver.resolveComponentFactory(TzCreate4Page);
      let componentRef = this.container.createComponent(factory);
      componentRef.instance.propertyId = this.propertyId;
      componentRef.instance.dropdownDS = this.dropdownDS;
    }
    {
      const factory: ComponentFactory<TzCreate5Page> = this.resolver.resolveComponentFactory(TzCreate5Page);
      let componentRef = this.container.createComponent(factory);
      componentRef.instance.propertyId = this.propertyId;
      componentRef.instance.dropdownDS = this.dropdownDS;
    }
    {
      const factory: ComponentFactory<TzCreate6Page> = this.resolver.resolveComponentFactory(TzCreate6Page);
      let componentRef = this.container.createComponent(factory);
      componentRef.instance.propertyId = this.propertyId;

    }
    {
      const factory: ComponentFactory<TzCreate7Page> = this.resolver.resolveComponentFactory(TzCreate7Page);
      let componentRef = this.container.createComponent(factory);
      componentRef.instance.propertyId = this.propertyId;
      componentRef.instance.dropdownDS = this.dropdownDS;
    }
    {
      const factory: ComponentFactory<TzCreate8Page> = this.resolver.resolveComponentFactory(TzCreate8Page);
      let componentRef = this.container.createComponent(factory);
      componentRef.instance.propertyId = this.propertyId;
      componentRef.instance.dropdownDS = this.dropdownDS;
    }
    {
      const factory: ComponentFactory<TzCreate9Page> = this.resolver.resolveComponentFactory(TzCreate9Page);
      let componentRef = this.container.createComponent(factory);
      componentRef.instance.propertyId = this.propertyId;
      componentRef.instance.dropdownDS = this.dropdownDS;
    }
    {
      const factory: ComponentFactory<TzCreate10Page> = this.resolver.resolveComponentFactory(TzCreate10Page);
      let componentRef = this.container.createComponent(factory);
      componentRef.instance.propertyId = this.propertyId;
      
    }
    {
      const factory: ComponentFactory<TzCreate11Page> = this.resolver.resolveComponentFactory(TzCreate11Page);
      let componentRef = this.container.createComponent(factory);
      componentRef.instance.propertyId = this.propertyId;
    
    }
  }

}