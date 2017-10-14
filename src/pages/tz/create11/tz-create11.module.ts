import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TzCreate11Page } from './tz-create11';

@NgModule({
  declarations: [
    TzCreate11Page,
  ],
  imports: [
    IonicPageModule.forChild(TzCreate11Page),
  ],
  exports: [
    TzCreate11Page
  ]
})
export class TzCreate11PageModule {}
