import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddInpectHandlePage } from './add-inpect-handle';

@NgModule({
  declarations: [
    AddInpectHandlePage,
  ],
  imports: [
    IonicPageModule.forChild(AddInpectHandlePage),
  ],
  exports: [
    AddInpectHandlePage
  ]
})
export class AddInpectHandlePageModule {}
