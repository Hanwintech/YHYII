import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UrgeHandlePage } from './urge-handle';

@NgModule({
  declarations: [
    UrgeHandlePage,
  ],
  imports: [
    IonicPageModule.forChild(UrgeHandlePage),
  ],
  exports: [
    UrgeHandlePage
  ]
})
export class UrgeHandleModule {}
