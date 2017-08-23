import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { IUser } from '../models/user.model';
import { Storage } from '@ionic/storage';

/**
 * GlobalCache
 */
@Injectable()
export class GlobalCache {
    private _currentUser: IUser;
    public get currentUser(): IUser {
        return this._currentUser;
    }
    public set currentUser(v: IUser) {
        this._currentUser = v;
        if (v != null) {
            this.storage.set("user", v).then(data => {
            }).catch(error => {
            });
        }
    }

    constructor(private storage: Storage,
        private apiService: ApiService
    ) {

    }

}