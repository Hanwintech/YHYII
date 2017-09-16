import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

import { TZCreate1Page } from './tz-create1';

@NgModule({
  declarations: [
    TZCreate1Page,
  ],
  imports: [
    IonicPageModule.forChild(TZCreate1Page),
  ],
  exports: [
    TZCreate1Page
  ],
  providers: [
    Geolocation
  ]
})
export class TZCreatePage1Module { }
