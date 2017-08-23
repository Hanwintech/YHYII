import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InspectHistorySearchPage } from './inspect-history-search';

@NgModule({
  declarations: [
    InspectHistorySearchPage,
  ],
  imports: [
    IonicPageModule.forChild(InspectHistorySearchPage),
  ],
  exports: [
    InspectHistorySearchPage
  ]
})
export class InspectHistorySearchPageModule {}
