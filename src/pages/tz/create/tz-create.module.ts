import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

import { TZCreatePage } from './tz-create';
// import { TZCreate1Page } from './../../tz/create1/tz-create1';

@NgModule({
  declarations: [
    TZCreatePage,
    // TZCreate1Page,
  ],
  imports: [
    IonicPageModule.forChild(TZCreatePage),
  ],
  exports: [
    TZCreatePage
  ],
  providers: [
    Geolocation
  ]
})
export class TZCreatePageModule { }
