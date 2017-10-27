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

    initialData(json):Observable<boolean> {
        console.log(111);
        return Observable.create(res=>{
            this.sqlitePorter.importJsonToDb(this.database, json).then((result) =>{ res.next(result);console.log("Imported");})
                .catch(e =>{ console.error(e);res.next(false);console.error(23213213213)});
        },error=>{});

    }

    deleteData(deleteString):Observable<string> {
        return Observable.create(observer => {
            this.sqlite.create({
                name: "data.db",
                location: "default"
            }).then((db: SQLiteObject) => {
                db.executeSql(deleteString, {}).then((rs) => {
                    console.log(rs);
                }, (error) => {
                    observer.next(error);
                })
            });
        });
    }

    getSelectData(InsertQuery: string): Observable<Array<string>> {
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
                     else {
                        observer.next(false);
                        }
                },error=>{
                    observer.next(false); 
                })
            });
        });
    }

}