import { Injectable } from '@angular/core';
import { Http, Headers, RequestMethod, Request } from '@angular/http';
import { GlobalCache } from './../services/globalCache.service';
import 'rxjs/add/operator/map';

import { _baseService } from "./_base.service"
import { BaseRequest } from './baseRequest';

@Injectable()
export class InspectService extends _baseService {
    token: string;
    constructor(private http: Http,private globalCache:GlobalCache) { super(); }

    getPropertyList(inspectSearchPara:any) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let options = {
            method: RequestMethod.Post,
            url: this.baseUrl + '/api/Inspect/ListProperty',
            headers: headers,
            body:inspectSearchPara,
        };
        return this.http.request(new Request(options)).map(res => res.json());
    }

    getPositionList(recordId: any) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let options = {
            method: RequestMethod.Get,
            url: this.baseUrl + '/api/Inspect/ListPosition?recordId=' + recordId,
            headers: headers
        };
        return this.http.request(new Request(options)).map(res => res.json());
    }
    getInspect(positionRecordId:any) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let options = {
            method: RequestMethod.Get,
            url: this.baseUrl + '/api/Inspect/GetInspect?positionRecordId='+positionRecordId,
            headers: headers
        };
        return this.http.request(new Request(options)).map(res => res.json());
    }

    getSaveInspect(inspectContent:any) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'bearer ' + this.token);
        let options = {
            method: RequestMethod.Post,
            url: this.baseUrl + '/api/Inspect/SaveInspect ',
            headers: headers,          
            body:JSON.parse(JSON.stringify(inspectContent)),
        };
        return this.http.request(new Request(options)).map(res => res.json());
    }
    
     getsubmitInspect(inspectRecordId:any) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = {
            method: RequestMethod.Get,
            url: this.baseUrl + '/api/Inspect/SubmitInspect?id='+inspectRecordId,
            headers: headers
        };
        return this.http.request(new Request(options)).map(res => res.json());
    }
}