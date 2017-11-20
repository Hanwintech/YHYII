import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InspectSearchPage } from './inspect-search';

@NgModule({
  declarations: [
    InspectSearchPage,
  ],
  imports: [
    IonicPageModule.forChild(InspectSearchPage),
  ],
  exports: [
    InspectSearchPage
  ]
})
export class InspectSearchPageModule {}
