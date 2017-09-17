import { Component, ViewChild, ViewContainerRef, ComponentFactory, ComponentRef, ComponentFactoryResolver } from '@angular/core';
import { NavController, Platform, IonicPage, MenuController, AlertController, NavParams } from 'ionic-angular';

import { TZCreate1Page } from './../create1/tz-create1';
import { TzCreate2Page } from './../create2/tz-create2';

@IonicPage()
@Component({
  selector: 'page-tz-create',
  templateUrl: 'tz-create.html',
})
export class TZCreatePage {
  propertyId: string;
  componentRef: ComponentRef<TZCreate1Page>;
  @ViewChild("formContent", { read: ViewContainerRef }) container: ViewContainerRef;

  menuList = [];
  selectedMenuId = "";
  lt: boolean;

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
      { id: "5", name: "檐口以下立面形式" },
      { id: "6", name: "构架形制" },
      { id: "7", name: "斗栱" },
      { id: "8", name: "装修形制" },
      { id: "9", name: "油饰彩画" },
      { id: "10", name: "屋顶瓦面" },
      { id: "11", name: "附属文物" },
      { id: "12", name: "古建备注" }];
  }

  toggleMenu() {
    this.menuCtrl.toggle("tzCreateMenu");
  }

  openPage(menuId) {
    this.selectedMenuId = menuId;
    this.container.clear();

    if (menuId == "1") {
      const factory: ComponentFactory<TZCreate1Page> = this.resolver.resolveComponentFactory(TZCreate1Page);
      let componentRef = this.container.createComponent(factory);
      componentRef.instance.propertyId = this.propertyId;
    } else if (menuId == "2") {
      const factory: ComponentFactory<TzCreate2Page> = this.resolver.resolveComponentFactory(TzCreate2Page);
      let componentRef = this.container.createComponent(factory);
      componentRef.instance.propertyId = this.propertyId;
    }
    this.toggleMenu();
  }

  ionViewDidLoad() {
    this.selectedMenuId = this.menuList[0].id;

    const factory: ComponentFactory<TZCreate1Page> = this.resolver.resolveComponentFactory(TZCreate1Page);
    let componentRef = this.container.createComponent(factory);
    componentRef.instance.propertyId = this.propertyId;    
  }
}