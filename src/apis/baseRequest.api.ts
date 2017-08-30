import { URLSearchParams } from '@angular/http';
/**
 * BaseRequest
 */
export class BaseRequest {
    method: string;
    requestUrl: string;
    requestArgument: URLSearchParams;
    requestBody: any;
    constructor() { }
}