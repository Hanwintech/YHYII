import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

import { TZCreatePage } from './tz-create';

@NgModule({
  declarations: [
    TZCreatePage,
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
export class TZIndexPageModule { }
