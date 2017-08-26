import { Injectable } from '@angular/core';
import { Http, Headers, RequestMethod, Request } from '@angular/http';
import 'rxjs/add/operator/map';

import { _baseService } from "./_base.service"
import { BaseRequest } from './baseRequest';

@Injectable()
export class HandleService extends _baseService {
    constructor(private http: Http) { super(); }

    getProblemList() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let options = {
            method: RequestMethod.Get,
            url: this.baseUrl + '/api/Problem/ListProblem',
            headers: headers
        };
        return this.http.request(new Request(options)).map(res => res.json());     
    }   
}