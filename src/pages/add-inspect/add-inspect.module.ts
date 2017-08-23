import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddInspectPage } from './add-inspect';

@NgModule({
  declarations: [
    AddInspectPage,
  ],
  imports: [
    IonicPageModule.forChild(AddInspectPage),
  ],
  exports: [
    AddInspectPage
  ]
})
export class AddInspectPageModule {}
