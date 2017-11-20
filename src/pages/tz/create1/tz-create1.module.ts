import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { TzCreate1Page } from './tz-create1';

@NgModule({
  declarations: [
    TzCreate1Page,
  ],
  imports: [
    IonicPageModule.forChild(TzCreate1Page),
  ],
  exports: [
    TzCreate1Page
  ]
})
export class TzCreate1PageModule { }
