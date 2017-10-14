import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TzCreate6Page } from './tz-create6';

@NgModule({
  declarations: [
    TzCreate6Page,
  ],
  imports: [
    IonicPageModule.forChild(TzCreate6Page),
  ],
  exports: [
    TzCreate6Page
  ]
})
export class TzCreate6PageModule {}
