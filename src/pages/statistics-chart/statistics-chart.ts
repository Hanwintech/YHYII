import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EchartsNg2Component, EChartOption } from 'echarts-ng2';

import { StatisticsService } from './../../services/statistics.service';
import { ChartDataSource, ChartSeries } from './../../models/statistics/chartDataSource.model';

@IonicPage()
@Component({
    selector: 'page-statistics-chart',
    templateUrl: 'statistics-chart.html',
})
export class StatisticsChartPage {
    @ViewChild('chart1') chart1: EchartsNg2Component;
    @ViewChild('chart2') chart2: EchartsNg2Component;
    @ViewChild('chart3') chart3: EchartsNg2Component;
    title: string;
    option1: EChartOption;
    option2: EChartOption;
    option3: EChartOption;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public statisticsService: StatisticsService) {

    }
    ionViewDidLoad() {
        switch (this.navParams.data) {
            case (1):
                this.title = "按时间统计";
                break;
            case (2):
                this.title = "按周期统计";
                break;
            case (3):
                this.title = "按遗产点统计";
                break;
            case (4):
                this.title = "按人员统计";
                break;
            case (5):
                this.title = "按问题类型统计";
                break;
            default:
                break;
        }

        this.statisticsService.getChartData(this.navParams.data)
            .subscribe(function (res) {
                let data = res.data as ChartDataSource;

                let op1 = {
                    legend: {
                        top: 20,
                        data: data.series
                    },
                    //grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
                    xAxis: { data: data.xAxis },
                    yAxis: {},
                    series: []
                };
                let op2 = {
                    legend: {
                        top: 20,
                        data: data.series
                    },
                    xAxis: { data: data.xAxis },
                    yAxis: {},
                    series: []
                };
                let op3 = {
                    legend: {
                        data: data.series
                    },
                    series: []
                };

                let centerleft = 1 / data.series.length / 2;
                for (let s of data.series) {

                    op1.series.push({
                        name: s.name,
                        type: 'line',
                        label: {
                            normal: { show: true, position: 'top' }
                        },
                        data: s.data
                    });
                    op2.series.push({
                        name: s.name,
                        type: 'bar',
                        label: {
                            normal: { show: true, position: 'top' }
                        },
                        data: s.data
                    });

                    let op3Data = [];
                    for (var i = 0; i < data.xAxis.length; i++) {
                        op3Data.push({ value: s.data[i], name: data.xAxis[i] });
                    }

                    op3.series.push({
                        name: s.name,
                        type: 'pie',
                        radius: '55%',
                        center: [(centerleft * 100).toString() + '%', '50%'],
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    formatter: '{c}',
                                    position: 'inside'
                                },
                                labelLine: { show: true }
                            }
                        },
                        data: op3Data
                    });
                    centerleft += 1 / data.series.length;
                }
                this.option1 = op1;
                this.option2 = op2;
                this.option3 = op3;
            }.bind(this),
            error => {
                alert(error);
            });
    }
}