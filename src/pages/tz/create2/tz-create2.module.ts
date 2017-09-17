import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TzCreate2Page } from './tz-create2';

@NgModule({
  declarations: [
    TzCreate2Page,
  ],
  imports: [
    IonicPageModule.forChild(TzCreate2Page),
  ],
  exports: [
    TzCreate2Page
  ]
})
export class TzCreate2PageModule {}
