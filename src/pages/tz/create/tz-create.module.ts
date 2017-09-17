import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

import { TZCreatePage } from './tz-create';
import { TZCreate1Page } from './../create1/tz-create1';
import { TzCreate2Page } from './../create2/tz-create2';

@NgModule({
  declarations: [
    TZCreatePage,
    TZCreate1Page,
    TzCreate2Page,
  ],
  imports: [
    IonicPageModule.forChild(TZCreatePage),
  ],
  exports: [
    TZCreatePage
  ],
  entryComponents: [
    TZCreate1Page,
    TzCreate2Page,
  ],
  providers: [
    Geolocation
  ]
})
export class TZCreatePageModule { }
