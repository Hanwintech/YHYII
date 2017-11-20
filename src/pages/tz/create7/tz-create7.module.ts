import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TzCreate7Page } from './tz-create7';

@NgModule({
  declarations: [
    TzCreate7Page,
  ],
  imports: [
    IonicPageModule.forChild(TzCreate7Page),
  ],
  exports: [
    TzCreate7Page
  ]
})
export class TzCreate7PageModule {}
