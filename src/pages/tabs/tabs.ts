import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  tab1Root = 'InspectIndexPage';
  tab2Root = 'StatisticsPage';
  tab3Root = 'TZCreatePage';
  tab4Root = 'MyPage';
}
