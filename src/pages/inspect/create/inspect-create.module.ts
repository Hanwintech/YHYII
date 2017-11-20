import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InspectCreatePage } from './inspect-create';

@NgModule({
  declarations: [
    InspectCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(InspectCreatePage),
  ],
  exports: [
    InspectCreatePage
  ]
})
export class AddInspectPageModule {}
