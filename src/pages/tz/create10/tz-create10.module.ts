import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TzCreate10Page } from './tz-create10';

@NgModule({
  declarations: [
    TzCreate10Page,
  ],
  imports: [
    IonicPageModule.forChild(TzCreate10Page),
  ],
  exports: [
    TzCreate10Page
  ]
})
export class TzCreate10PageModule {}
