import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InspectViewPage } from './inspect-view';

@NgModule({
  declarations: [
    InspectViewPage,
  ],
  imports: [
    IonicPageModule.forChild(InspectViewPage),
  ],
  exports: [
    InspectViewPage
  ]
})
export class AddInspectViewPageModule {}
