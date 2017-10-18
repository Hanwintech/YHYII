import { Injectable } from '@angular/core';
import { Http, Headers, RequestMethod, Request } from '@angular/http';
import 'rxjs/add/operator/map';

import { ApiService } from './api.service';

@Injectable()
export class InspectService extends ApiService {
    token: string;
    constructor(public http: Http) { super(http); }

    getDiseaseInspection(){
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let options = {
            method: RequestMethod.Get,
            url: this.baseUrl + '/Inspect/DiseaseInspection',
            headers: headers,
        };
        return this.http.request(new Request(options)).map(res => res.json());
    }

    getAreaList() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let options = {
            method: RequestMethod.Get,
            url: this.baseUrl + '/Inspect/ListInspectArea',
            headers: headers,
        };
        return this.http.request(new Request(options)).map(res => res.json());
    }
    getSceneryList() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let options = {
            method: RequestMethod.Get,
            url: this.baseUrl + '/Inspect/ListScenery',
            headers: headers,
        };
        return this.http.request(new Request(options)).map(res => res.json());
    }

    getListAncientArchitecture() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let options = {
            method: RequestMethod.Get,
            url: this.baseUrl + '/Inspect/ListAncientArchitecture',
            headers: headers,
        };
        return this.http.request(new Request(options)).map(res => res.json());
    }
    getListDisInspectPosition() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let options = {
            method: RequestMethod.Get,
            url: this.baseUrl + '/Inspect/ListDisInspectPosition',
            headers: headers,
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
    getInspect(positionRecordId: any) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let options = {
            method: RequestMethod.Get,
            url: this.baseUrl + '/api/Inspect/GetInspect?positionRecordId=' + positionRecordId,
            headers: headers
        };
        return this.http.request(new Request(options)).map(res => res.json());
    }

    getSaveInspect(inspectContent: any) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'bearer ' + this.token);
        let options = {
            method: RequestMethod.Post,
            url: this.baseUrl + '/api/Inspect/SaveInspect ',
            headers: headers,
            body: JSON.parse(JSON.stringify(inspectContent)),
        };
        return this.http.request(new Request(options)).map(res => res.json());
    }

    getsubmitInspect(inspectRecordId: any) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = {
            method: RequestMethod.Get,
            url: this.baseUrl + '/api/Inspect/SubmitInspect?id=' + inspectRecordId,
            headers: headers
        };
        return this.http.request(new Request(options)).map(res => res.json());
    }
}