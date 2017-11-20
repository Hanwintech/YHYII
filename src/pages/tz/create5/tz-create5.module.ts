import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TzCreate5Page } from './tz-create5';

@NgModule({
  declarations: [
    TzCreate5Page,
  ],
  imports: [
    IonicPageModule.forChild(TzCreate5Page),
  ],
  exports: [
    TzCreate5Page
  ]
})
export class TzCreate5PageModule {}
