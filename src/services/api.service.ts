import { Injectable } from '@angular/core';
import { Http, Headers, RequestMethod, Request } from '@angular/http';
import 'rxjs/add/operator/map';

import { _baseService } from "./_base.service"
import { BaseRequest } from './baseRequest';
import { IHttpCommonResponse } from "./../models/httpCommonResponse.model";

@Injectable()
export class ApiService extends _baseService {
    token: string;
    constructor(private http: Http) { super(); }

    getToken(account: string, password: string) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let options = {
            method: RequestMethod.Post,
            url: this.baseUrl + '/api/token',
            headers: headers,
            body: "grant_type=password&username=" + account + "&password=" + password
        };
        return this.http.request(new Request(options))
            .map(res => res.json());
    }

    sendApi(request: BaseRequest) {
        let headers = new Headers();
        headers.append('Authorization', 'bearer ' + this.token);
        if (request.method == 'POST') {
            headers.append('Content-Type', 'application/json');
        }
        let options = {
            method: request.method,
            url: this.baseUrl + request.requestUrl,
            headers: headers,
            body: JSON.stringify(request.requestBody),
            params: request.requestArgument
        };
        return this.http.request(new Request(options))
            .map(res => <IHttpCommonResponse<any>>res.json());

    }
}