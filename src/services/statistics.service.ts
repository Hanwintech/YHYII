import { BaseRequest } from './baseRequest';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestMethod, Request } from '@angular/http';
import 'rxjs/add/operator/map';

import { ApiService } from './api.service';

@Injectable()
export class StatisticsService extends ApiService {
    constructor(public http: Http) { super(http); }

    getChartData(chartType:number)  {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let options = {
            method: RequestMethod.Get,
            url: this.baseUrl + '/api/Statistics/GetChartData?chartType=' + chartType.toString(),
            headers: headers
        };
        return this.http.request(new Request(options)).map(res => res.json());
    }
}