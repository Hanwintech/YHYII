import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InspectMorePage } from './inspect-more';

@NgModule({
  declarations: [
    InspectMorePage,
  ],
  imports: [
    IonicPageModule.forChild(InspectMorePage),
  ],
  exports: [
    InspectMorePage
  ]
})
export class InspectMorePageModule {}
