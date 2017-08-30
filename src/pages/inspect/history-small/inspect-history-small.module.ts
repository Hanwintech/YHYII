import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InspectHistorySmallPage } from './inspect-history-small';

@NgModule({
  declarations: [
    InspectHistorySmallPage,
  ],
  imports: [
    IonicPageModule.forChild(InspectHistorySmallPage),
  ],
  exports: [
    InspectHistorySmallPage
  ]
})
export class InspectHistorySmallPageModule {}
