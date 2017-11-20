import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TzCreate9Page } from './tz-create9';

@NgModule({
  declarations: [
    TzCreate9Page,
  ],
  imports: [
    IonicPageModule.forChild(TzCreate9Page),
  ],
  exports: [
    TzCreate9Page
  ]
})
export class TzCreate9PageModule {}
