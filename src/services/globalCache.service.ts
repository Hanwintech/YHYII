import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Storage } from '@ionic/storage';

@Injectable()
export class GlobalCache {
    private _user: User;
    private _token;
    public get user(): User { return this._user; }
    public get token(): any { return this._token; }

    constructor(private storage: Storage) { }

    public init(callback) {
        this.storage.get("user").then(u => {
            this._user = u;
            if (callback) { callback(); }
        });
        this.storage.get("token").then(token=>{
            this._token=token;
        });
    }

    public cacheUser(u: User) {
        console.log("global 里的user");
        console.log(u);
        this._user = u;
        if (u) {
            this.storage.set("user", u);
        } else {
            this.clearUser();
        }
    }

    public cacheToken(token) {
        this._token = token;
        if (token) {
            this.storage.set("token", token);
        }
        else {
            this.clearToken();
        }
    }

    public clearUser(): Promise<any> {
        this._user = null;
        return this.storage.remove("user");
    }

    public clearToken(): any {
        this._token = null;
        return this.storage.remove("token");
    }
}
