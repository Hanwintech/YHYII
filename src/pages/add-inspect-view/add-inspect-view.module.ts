import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddInspectViewPage } from './add-inspect-view';

@NgModule({
  declarations: [
    AddInspectViewPage,
  ],
  imports: [
    IonicPageModule.forChild(AddInspectViewPage),
  ],
  exports: [
    AddInspectViewPage
  ]
})
export class AddInspectViewPageModule {}
