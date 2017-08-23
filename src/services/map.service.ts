import { BaseRequest } from './../apis/baseRequest.api';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestMethod, Request } from '@angular/http';
import 'rxjs/add/operator/map';

import { _baseService } from "./_base.service"
import { ApiService } from "./api.service"

@Injectable()
export class MapService extends _baseService {
    constructor(private http: Http, private apiService: ApiService) { super(); }

    getInspectInfo(longitude: number, latitude: number) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let options = {
            method: RequestMethod.Get,
            url: this.baseUrl + '/api/Map/getInspectInfo?lon=' + longitude.toString() + '&lat=' + latitude.toString(),
            headers: headers
        };
        return this.http.request(new Request(options)).map(res => res.json());
    }

    getProblemInfo(longitude: number, latitude: number) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('Authorization', 'bearer ' + this.apiService.token);
        let options = {
            method: RequestMethod.Get,
            url: this.baseUrl + '/api/Problem/ListProblemPosition?lon=' + longitude.toString() + '&lat=' + latitude.toString(),
            headers: headers
        };
        return this.http.request(new Request(options)).map(res => res.json());
    }
}