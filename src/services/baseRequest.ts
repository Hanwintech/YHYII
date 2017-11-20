import { URLSearchParams } from '@angular/http';

export class BaseRequest {
    method: string;
    requestUrl: string;
    requestArgument: URLSearchParams;
    requestBody: any;

    constructor() { }
}