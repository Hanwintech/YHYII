import { Injectable } from '@angular/core';
import { Http, Headers, RequestMethod, Request } from '@angular/http';
import 'rxjs/add/operator/map';

import { ApiService } from './api.service';

@Injectable()
export class InspectService extends ApiService {
    token: string;
    constructor(public http: Http) { super(http); }

    getDiseaseInspection() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let options = {
            method: RequestMethod.Get,
            url: this.baseUrl + '/api/Inspect/DiseaseInspection',
            headers: headers,
        };
        return this.http.request(new Request(options)).map(res => res.json());
    }
    getSaveInspect(inspectContent: any) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        //headers.append('Authorization', 'bearer ' + this.token);
        let options = {
            method: RequestMethod.Post,
            url: this.baseUrl + '/api/Inspect/SaveDiseaseInspect',
            headers: headers,
            body: inspectContent,
        };
        return this.http.request(new Request(options)).map(res => res.json());
    }

    //获取附件xinxi

getFiles(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let options = {
        method: RequestMethod.Get,
        url: this.baseUrl + '/api/Inspect/InspectAttachmentList',
        headers: headers,
    };
    return this.http.request(new Request(options)).map(res => res.json());
}

    // 台账信息列表
    getListAncientArchitecture() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let options = {
            method: RequestMethod.Get,
            url: this.baseUrl + '/api/AncientArchiteture/ListAncientArchitecture',
            headers: headers,
        };
        return this.http.request(new Request(options)).map(res => res.json());
    }

    saveListAncientArchitecture(data) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = {
            method: RequestMethod.Post,
            url: this.baseUrl + '/api/AncientArchiteture/SaveAncientArchitectureList',
            headers: headers,
            body:data
        };
        return this.http.request(new Request(options)).map(res => res.json());
    }
}