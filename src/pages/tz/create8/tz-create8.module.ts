import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TzCreate8Page } from './tz-create8';

@NgModule({
  declarations: [
    TzCreate8Page,
  ],
  imports: [
    IonicPageModule.forChild(TzCreate8Page),
  ],
  exports: [
    TzCreate8Page
  ]
})
export class TzCreate8PageModule {}
