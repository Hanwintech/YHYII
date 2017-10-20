import { Injectable } from '@angular/core';
import { Http, Headers, RequestMethod, Request } from '@angular/http';
import 'rxjs/add/operator/map';

import { _baseService } from "./_base.service"

@Injectable()
export class InspectService extends _baseService {
    token: string;
    constructor(private http: Http) { super(); }

    getDiseaseInspection(){
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let options = {
            method: RequestMethod.Get,
            url: this.baseUrl + '/Inspect/DiseaseInspection',
            headers: headers,
        };
        return this.http.request(new Request(options)).map(res => res.json() );
    }


    getSaveInspect(inspectContent: any) {
        console.log(inspectContent);
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        //headers.append('Authorization', 'bearer ' + this.token);
        let options = {
            method: RequestMethod.Post,
            url: this.baseUrl + '/Inspect/SaveDiseaseInspect',
            headers: headers,
            body:inspectContent,
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