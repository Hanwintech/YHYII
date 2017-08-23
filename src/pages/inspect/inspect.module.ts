import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InspectPage } from './inspect';
import { Geolocation } from '@ionic-native/geolocation';

@NgModule({
  declarations: [
    InspectPage,
  ],
  imports: [
    IonicPageModule.forChild(InspectPage),
  ],
  exports: [
    InspectPage
  ],
  providers: [
    Geolocation
  ]
})
export class InspectPageModule { }
