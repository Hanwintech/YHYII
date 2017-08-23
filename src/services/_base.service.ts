import { Injectable } from '@angular/core';

@Injectable()
export class _baseService {
    public baseUrl: string = "";
    constructor() {
        this.baseUrl = "http://hmerc.hanwintech.com:10000/CHDYH.API";
    }

    getPicUrl(pic: string): string {
        if (pic.length > 0 && pic[0] == "~") {
            return this.baseUrl + pic.substring(1);
        } else {
            return pic;
        }
    }
}