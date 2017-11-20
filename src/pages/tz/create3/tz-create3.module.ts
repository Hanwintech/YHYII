import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TzCreate3Page } from './tz-create3';

@NgModule({
  declarations: [
    TzCreate3Page,
  ],
  imports: [
    IonicPageModule.forChild(TzCreate3Page),
  ],
  exports: [
    TzCreate3Page
  ]
})
export class TzCreate3PageModule {}
