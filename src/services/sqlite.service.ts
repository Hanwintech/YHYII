import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Platform } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { SQLitePorter } from '@ionic-native/sqlite-porter';
import { Observable } from "rxjs";

@Injectable()
export class SqlService {
    private _db: any;
    private win: any = window;
    public db = null;
    database;
    arr;
    constructor(platform: Platform, public sqlite: SQLite, private sqlitePorter: SQLitePorter) {
        this.sqlite.echoTest().then((res) => {
            this.initDB();
        }, (error) => { return });
    }
    
    initDB() {
        this.sqlite.create({
            name: 'data.db',
            location: 'default'
        })
            .then((db: any) => {
                this.database = db._objectInstance;
                // we can pass db._objectInstance as the database option in all SQLitePorter methods
            });
    }

    initialData(json) {
        this.initDB();
        this.sqlitePorter.importJsonToDb(this.database, json).then(() => console.log('Imported'))
            .catch(e => console.error(e));
    }

    deleteData() {
        this.sqlite.deleteDatabase({
            name: "data.db",
            location: "default"
        })
    }

    getSelectData(InsertQuery: string): Observable<string> {
        let arr = [];
        return Observable.create(observer => {
            this.sqlite.create({
                name: "data.db",
                location: "default"
            }).then((db: SQLiteObject) => {
                db.executeSql(InsertQuery, {}).then((rs) => {
                    if (rs.rows.length > 0) {
                        for (var i = 0; i < rs.rows.length; i++) {
                            var item = rs
                                .rows
                                .item(i);
                            arr.push(item);
                        }
                        observer.next(arr);
                    }
                }, (error) => {
                    observer.next(error);
                })
            });
        });
    }

}