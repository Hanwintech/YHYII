import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchMainPage } from './search-main';

@NgModule({
  declarations: [
    SearchMainPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchMainPage),
  ],
  exports: [
    SearchMainPage
  ]
})
export class SearchMainPageModule {}
