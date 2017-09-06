import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

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
