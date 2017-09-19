import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InspectSceneryPage } from './inspect-scenery';

@NgModule({
  declarations: [
    InspectSceneryPage,
  ],
  imports: [
    IonicPageModule.forChild(InspectSceneryPage),
  ],
  exports: [
    InspectSceneryPage
  ]
})
export class InspectSceneryPageModule {}
