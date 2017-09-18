import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

import { TZCreatePage } from './tz-create';
import { TzCreate1Page } from './../create1/tz-create1';
import { TzCreate2Page } from './../create2/tz-create2';

@NgModule({
  declarations: [
    TZCreatePage,
    TzCreate1Page,
    TzCreate2Page,
  ],
  imports: [
    IonicPageModule.forChild(TZCreatePage),
  ],
  exports: [
    TZCreatePage
  ],
  entryComponents: [
    TzCreate1Page,
    TzCreate2Page,
  ],
  providers: [
    Geolocation
  ]
})
export class TZCreatePageModule { }
