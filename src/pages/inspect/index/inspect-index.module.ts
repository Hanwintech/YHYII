import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

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
    Geolocation
  ]
})
export class InspectIndexPageModule { }
