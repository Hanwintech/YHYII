import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InspectHistoryPage } from './inspect-history';

@NgModule({
  declarations: [
    InspectHistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(InspectHistoryPage),
  ],
  exports: [
    InspectHistoryPage
  ]
})
export class InspectHistoryPageModule {}
