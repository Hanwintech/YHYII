import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

import { TZCreatePage } from './tz-create';
import { TzCreate1Page } from './../create1/tz-create1';
import { TzCreate2Page } from './../create2/tz-create2';
import { TzCreate3Page } from './../create3/tz-create3';
import { TzCreate4Page } from './../create4/tz-create4';
import { TzCreate5Page } from './../create5/tz-create5';
import { TzCreate6Page } from './../create6/tz-create6';
import { TzCreate7Page } from './../create7/tz-create7';
import { TzCreate8Page } from './../create8/tz-create8';
import { TzCreate9Page } from './../create9/tz-create9';
import { TzCreate10Page } from './../create10/tz-create10';
import { TzCreate11Page } from './../create11/tz-create11';

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
  entryComponents: [  
  ],
  providers: [
    Geolocation
  ]
})
export class TZCreatePageModule { }
