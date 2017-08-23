import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StatisticsChartPage } from './statistics-chart';
import { EchartsNg2Module } from 'echarts-ng2'; 

@NgModule({
  declarations: [
    StatisticsChartPage,
  ],
  imports: [
    IonicPageModule.forChild(StatisticsChartPage),
    EchartsNg2Module
  ],
  exports: [
    StatisticsChartPage
  ]
})
export class StatisticsChartPageModule {}
