import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HandlePage } from './handle';
import { Geolocation } from '@ionic-native/geolocation';

@NgModule({
  declarations: [
    HandlePage,
  ],
  imports: [
    IonicPageModule.forChild(HandlePage),
  ],
  exports: [
    HandlePage
  ],
  providers: [
    Geolocation
  ]
})
export class HandlePageModule {}
