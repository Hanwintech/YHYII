import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

import { TZIndexPage } from './tz-index';

@NgModule({
  declarations: [
    TZIndexPage,
  ],
  imports: [
    IonicPageModule.forChild(TZIndexPage),
  ],
  exports: [
    TZIndexPage
  ],
  providers: [
    Geolocation
  ]
})
export class TZIndexPageModule { }
