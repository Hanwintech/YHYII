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
        this.sqlitePorter.importJsonToDb(this.database, json)
            .then(() => console.log('Imported'))
            .catch(e => console.error(e));
    }

    importJsonToDb(json) {
        this.initDB();
        return this.sqlitePorter.importJsonToDb(this.database, json);
    }

    execSqlToDb(sql) {
        this.initDB();
        this.sqlitePorter.importSqlToDb(this.database, sql)
            .then(() => console.log('Imported'))
            .catch(e => console.error(e));
    }

    deleteData() {
        this.sqlite.deleteDatabase({
            name: "data.db",
            location: "default"
        })
    }
    insertData(dataSource): Observable<string> {
        var resultData = "INSERT INTO DiseaseRecord (InspectionPositionID,ancientArcID,diseaseLevel,inspectDescription,inspectPerson,inspectTime,isRepaired,location,picUrl,recordId,repairDescription,respairTime,workType) VALUES ('" +
            +  + "','" + dataSource.parentId + "','" + dataSource.location + "','" + dataSource.damamgeDegree + "','" +
            + dataSource.workType + "','" + dataSource.inspectDescription + "','" + dataSource.picUrl.join(",") + "','" +
            + dataSource.respair + "','" + dataSource.respairDescription + "','" + dataSource.inspectPerson + "','" + dataSource.inspectTime + "')";

        return Observable.create(observer => {
            this.sqlite.create({
                name: "data.db",
                location: "default"
            }).then((db: SQLiteObject) => {
                db.executeSql(resultData, {}).then((rs) => {
                    console.log(rs);
                }, (error) => {
                    observer.next(error);
                })
            });
        });
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
                    } else {
                        observer.next(false);
                    }
                }, (error) => {
                    observer.next(error);
                })
            });
        });
    }

}