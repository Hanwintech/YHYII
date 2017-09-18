import { Component, ViewChild } from '@angular/core';
import { IonicPage,Tabs,Platform } from 'ionic-angular';
import { BackButtonService } from "../../services/backButton.service";
import{InspectIndexPage}from './../inspect/index/inspect-index';
import{StatisticsPage}from './../statistics/statistics';
import{MyPage}from './../my/my';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
<<<<<<< HEAD
  tabRoots: Object[];
  @ViewChild('myTabs') tabRef: Tabs;
  constructor(public backButtonService: BackButtonService,
    private platform: Platform) {
      this.tabRoots = [
        {
          root: InspectIndexPage,
          tabTitle: '巡查',
          tabIcon: 'home'
        },
        {
          root: StatisticsPage,
          tabTitle: '修复',
          tabIcon: 'alarm'
        },
        {
          root: MyPage,
          tabTitle: '台账',
          tabIcon: 'analytics'
        },
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
=======
  tab1Root = 'TZIndexPage';
  tab2Root = 'StatisticsPage';
  tab3Root = 'InspectIndexPage';
  tab4Root = 'MyPage';
>>>>>>> 75d4ffeed3324dfcba733eed79d0f1ecd2a454e2
}
