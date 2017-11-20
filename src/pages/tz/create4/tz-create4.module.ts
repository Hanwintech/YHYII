import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TzCreate4Page } from './tz-create4';

@NgModule({
  declarations: [
    TzCreate4Page,
  ],
  imports: [
    IonicPageModule.forChild(TzCreate4Page),
  ],
  exports: [
    TzCreate4Page
  ]
})
export class TzCreate4PageModule {}
