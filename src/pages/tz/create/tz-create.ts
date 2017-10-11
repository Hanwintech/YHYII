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
  // selectedMenuId1 = "";
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
      { id: "5", name: "构架形制" },
      { id: "6", name: "斗栱" },
      { id: "7", name: "装修形制" },
      { id: "8", name: "油饰彩画" },
      { id: "9", name: "屋顶瓦面" },
      { id: "10", name: "古建备注" },
      { id: "11", name: "问题描述" }];

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
    else if (menuId == "2") { this.content.scrollTo(0, 623.17, 300); }
    else if (menuId == "3") { this.content.scrollTo(0, 1234.14, 300); }
    this.selectedMenuId = menuId;
    this.toggleMenu();
  }




  // openPage(menuId) {
  //   // console.log(menuId);
  //   this.selectedMenuId = menuId;
  //   this.container.clear();

  //   if (menuId == "1") {
  //     const factory: ComponentFactory<TzCreate1Page> = this.resolver.resolveComponentFactory(TzCreate1Page);
  //     let componentRef = this.container.createComponent(factory);
  //     componentRef.instance.propertyId = this.propertyId;
  //   } else if (menuId == "2") {
  //     const factory: ComponentFactory<TzCreate2Page> = this.resolver.resolveComponentFactory(TzCreate2Page);
  //     let componentRef = this.container.createComponent(factory);
  //     componentRef.instance.propertyId = this.propertyId;
  //   } else if (menuId == "3") {
  //     const factory: ComponentFactory<TzCreate3Page> = this.resolver.resolveComponentFactory(TzCreate3Page);
  //     let componentRef = this.container.createComponent(factory);
  //     componentRef.instance.propertyId = this.propertyId;
  //   }
  //   else if (menuId == "4") {
  //     const factory: ComponentFactory<TzCreate4Page> = this.resolver.resolveComponentFactory(TzCreate4Page);
  //     let componentRef = this.container.createComponent(factory);
  //     componentRef.instance.propertyId = this.propertyId;
  //   }
  //   else if (menuId == "5") {
  //     const factory: ComponentFactory<TzCreate5Page> = this.resolver.resolveComponentFactory(TzCreate5Page);
  //     let componentRef = this.container.createComponent(factory);
  //     componentRef.instance.propertyId = this.propertyId;
  //   }
  //   else if (menuId == "6") {
  //     const factory: ComponentFactory<TzCreate6Page> = this.resolver.resolveComponentFactory(TzCreate6Page);
  //     let componentRef = this.container.createComponent(factory);
  //     componentRef.instance.propertyId = this.propertyId;
  //   }
  //   else if (menuId == "7") {
  //     const factory: ComponentFactory<TzCreate7Page> = this.resolver.resolveComponentFactory(TzCreate7Page);
  //     let componentRef = this.container.createComponent(factory);
  //     componentRef.instance.propertyId = this.propertyId;
  //   }
  //   else if (menuId == "8") {
  //     const factory: ComponentFactory<TzCreate8Page> = this.resolver.resolveComponentFactory(TzCreate8Page);
  //     let componentRef = this.container.createComponent(factory);
  //     componentRef.instance.propertyId = this.propertyId;
  //   }
  //   else if (menuId == "9") {
  //     const factory: ComponentFactory<TzCreate9Page> = this.resolver.resolveComponentFactory(TzCreate9Page);
  //     let componentRef = this.container.createComponent(factory);
  //     componentRef.instance.propertyId = this.propertyId;
  //   }
  //   else if (menuId == "10") {
  //     const factory: ComponentFactory<TzCreate10Page> = this.resolver.resolveComponentFactory(TzCreate10Page);
  //     let componentRef = this.container.createComponent(factory);
  //     componentRef.instance.propertyId = this.propertyId;
  //   }
  //   this.closeMenu();
  // }

  ionViewDidLoad() {
    this.enabletzCreateMenu();

    this.selectedMenuId = this.menuList[0].id;
    {
      const factory: ComponentFactory<TzCreate1Page> = this.resolver.resolveComponentFactory(TzCreate1Page);
      let componentRef = this.container.createComponent(factory);
      componentRef.instance.propertyId = this.propertyId;
    }
    {
      const factory: ComponentFactory<TzCreate2Page> = this.resolver.resolveComponentFactory(TzCreate2Page);
      let componentRef = this.container.createComponent(factory);
      componentRef.instance.propertyId = this.propertyId;
    }
    {
      const factory: ComponentFactory<TzCreate3Page> = this.resolver.resolveComponentFactory(TzCreate3Page);
      let componentRef = this.container.createComponent(factory);
      componentRef.instance.propertyId = this.propertyId;
    }
    {
      const factory: ComponentFactory<TzCreate4Page> = this.resolver.resolveComponentFactory(TzCreate4Page);
      let componentRef = this.container.createComponent(factory);
      componentRef.instance.propertyId = this.propertyId;
    }
    {
      const factory: ComponentFactory<TzCreate5Page> = this.resolver.resolveComponentFactory(TzCreate5Page);
      let componentRef = this.container.createComponent(factory);
      componentRef.instance.propertyId = this.propertyId;
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
    }
    {
      const factory: ComponentFactory<TzCreate8Page> = this.resolver.resolveComponentFactory(TzCreate8Page);
      let componentRef = this.container.createComponent(factory);
      componentRef.instance.propertyId = this.propertyId;
    }
    {
      const factory: ComponentFactory<TzCreate9Page> = this.resolver.resolveComponentFactory(TzCreate9Page);
      let componentRef = this.container.createComponent(factory);
      componentRef.instance.propertyId = this.propertyId;
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