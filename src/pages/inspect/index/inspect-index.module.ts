import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InspectIndexPage } from './inspect-index';

@NgModule({
  declarations: [
    InspectIndexPage,
  ],
  imports: [
    IonicPageModule.forChild(InspectIndexPage),
  ],
  exports: [
    InspectIndexPage
  ],
  providers: [
  ]
})
export class InspectIndexPageModule { }
