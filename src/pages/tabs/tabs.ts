import { Component, ViewChild } from '@angular/core';
import { IonicPage, Tabs, Platform } from 'ionic-angular';
import { BackButtonService } from "../../services/backButton.service";
import { InspectIndexPage } from './../inspect/index/inspect-index';
import { TZIndexPage } from './../tz/index/tz-index';
import { MyPage } from './../my/my';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  tabRoots: Object[];
  @ViewChild('myTabs') tabRef: Tabs;
  constructor(public backButtonService: BackButtonService,
    private platform: Platform) {
    this.tabRoots = [
      {
        root: TZIndexPage,
        tabTitle: '台账',
        tabIcon: 'analytics'
      },
      {
        root: InspectIndexPage,
        tabTitle: '巡查',
        tabIcon: 'home'
      },
      // {
      //   root: StatisticsPage,
      //   tabTitle: '修复',
      //   tabIcon: 'alarm'
      // },
      {
        root: MyPage,
        tabTitle: '系统',
        tabIcon: 'person'
      }

    ];

    platform.ready().then(() => {
      this.backButtonService.registerBackButtonAction(this.tabRef);
    });
  }
  // tab1Root = 'InspectIndexPage';
  // tab2Root = 'StatisticsPage';
  // tab3Root = 'StatisticsPage';
  // tab4Root = 'MyPage';
}