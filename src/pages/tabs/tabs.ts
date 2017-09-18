import { Component, ViewChild } from '@angular/core';
import { IonicPage,Tabs,Platform } from 'ionic-angular';
// import { BackButtonService } from "../../services/backButton.service";
import{InspectIndexPage}from './../inspect/index/inspect-index';
import{StatisticsPage}from './../statistics/statistics';
import{MyPage}from './../my/my';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  tab1Root = 'TZIndexPage';
  tab2Root = 'StatisticsPage';
  tab3Root = 'InspectIndexPage';
  tab4Root = 'MyPage';
}
