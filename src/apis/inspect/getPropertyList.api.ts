import { BaseRequest } from '../baseRequest.api';
/**
 * GetLatestAirConditionApi
 */
export class getPropertyListApi extends BaseRequest {
    constructor(inspectSearchPara:string) {
        super();
        this.method = "POST";
        this.requestUrl = "/api/Inspect/ListProperty";
        this.requestBody=inspectSearchPara;
    }
}