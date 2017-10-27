import { Component, ViewChild } from '@angular/core';
import { IonicPage, Tabs, Platform } from 'ionic-angular';
import { BackButtonService } from "../../services/backButton.service";
import { StatisticsPage } from './../statistics/statistics';
import { TZIndexPage } from './../tz/index/tz-index';
import { MyPage } from './../my/my';
import { GlobalCache } from './../../services/globalCache.service';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  tabRoots: Object[];
  tab1Root = 'MyPage';
  tab2Root = 'TZIndexPage';
  tab3Root = 'StatisticsPage';
  @ViewChild('myTabs') tabRef: Tabs;
  constructor(public backButtonService: BackButtonService, private globalCache: GlobalCache,
    private platform: Platform) {
    }
}
