import { Injectable } from '@angular/core';
import { Http, Headers, RequestMethod, Request } from '@angular/http';
import { Md5 } from "ts-md5/dist/md5";
import 'rxjs/add/operator/map';

import { BaseRequest } from './baseRequest';
import { IHttpCommonResponse } from "./../models/httpCommonResponse.model";

@Injectable()
export class ApiService {

    private _token: string;
    public get token(): string {
        if (!this._token) {
            this._token = localStorage.getItem('token');
        }
        return this._token;
    }
    public set token(v: string) {
        localStorage.setItem('token', v);
        this._token = v;
    }

    private _baseUrl: string;
    public get baseUrl(): string {
        if (!this._baseUrl) {
            this._baseUrl = localStorage.getItem('baseUrl');
            if (!this._baseUrl || this._baseUrl.length == 0) {
                this._baseUrl = "http://10.10.10.110:9000";
            }
        }
        return this._baseUrl;
    }
    public set baseUrl(v: string) {
        localStorage.setItem('baseUrl', v);
        this._baseUrl = v;
    }

    constructor(public http: Http) { }

    getToken(account: string, password: string) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let options = {
            method: RequestMethod.Post,
            url: this.baseUrl + '/api/token',
            headers: headers,
            body: "grant_type=custom" + "&username=" + account + "&password=" + password + "&user_type=2"
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
        var timestamp = Math.round(new Date().getTime() / 1000) + 28800;
        var nonce = "hygzf_app";
        var signature = Md5.hashStr("sipmch2017" + timestamp + nonce);
        headers.append('timestamp', timestamp.toString());
        headers.append('nonce', nonce);
        headers.append('signature', signature.toString().toUpperCase());
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