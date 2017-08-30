import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InspectHandleCreatePage } from './inspect-handle-create';

@NgModule({
  declarations: [
    InspectHandleCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(InspectHandleCreatePage),
  ],
  exports: [
    InspectHandleCreatePage
  ]
})
export class AddInpectHandlePageModule {}
