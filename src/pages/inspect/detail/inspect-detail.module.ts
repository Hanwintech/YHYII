import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InspectDetailPage } from './inspect-detail';

@NgModule({
  declarations: [
    InspectDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(InspectDetailPage),
  ],
  exports: [
    InspectDetailPage
  ]
})
export class InspectDetailPageModule {}
