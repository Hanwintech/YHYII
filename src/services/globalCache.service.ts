import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Storage } from '@ionic/storage';

@Injectable()
export class GlobalCache {
    private _user: User;
    public get user(): User { return this._user; }

    constructor(private storage: Storage) { }

    public init(callback) {
        this.storage.get("user").then(u => {
            this._user = u;
            if (callback) { callback(); }
        });
    }

    public cacheUser(u: User) {
        this._user = u;
        if (u) {
            this.storage.set("user", u);
        } else {
            this.clearUser();
        }
    }

    public clearUser(): Promise<any> {
        this._user = null;
        return this.storage.remove("user");
    }
}
