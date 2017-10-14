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

    selectData(sql): Observable<string> {
        this.initDB();
        return Observable.create(observable => {
            this.sqlitePorter.importSqlToDb(this.database, sql).then((res) => { console.log(res); observable.next(res); })
                .catch(e => { console.error(e); observable.next(e) });

        });
    }


    initialAreaData(dataId, dataName) {
        console.log("initialAreaData");
        this.initDB();
        var InsertQuery = "INSERT INTO area (ID,areaName) VALUES ('" + dataId + "','" + dataName + "')";
        this.database.open().then((data) => {
            this.database.executeSql("CREATE TABLE IF NOT EXISTS area (ID,areaName)", {}).then((data) => {
                this.database.executeSql(InsertQuery, {}).then((data) => {
                    console.log("create area")
                }, (error) => {
                    console.log(error);
                })
            }, (error) => {
                console.log(error);
            })
        });

    }
    initialSceneryData(dataId, dataName, InspectAreaID) {
        this.initDB();
        var InsertQuery = "INSERT INTO Scenery (ID,sceneryName,InspectAreaID) VALUES ('" + dataId + "','" + dataName + "','" + InspectAreaID + "')";
        this.database.open().then((data) => {
            this.database.executeSql("CREATE TABLE IF NOT EXISTS Scenery (ID,sceneryName,InspectAreaID)", {}).then((data) => {
                this.database.executeSql(InsertQuery, {}).then((data) => {
                    console.log("insert Scenery");
                }, (error) => {
                    console.log(error);
                })
            }, (error) => {
                console.log(error);
            })
        });
    }
    initialListAncientArchitecture(dataId, dataName, parentName) {
        var InsertQuery = "INSERT INTO AncientArchitecture (ID,ancientName,sceneryName) VALUES ('" + dataId + "','" + dataName + "','" + parentName + "')";
        this.sqlite.create({
            name: "data.db",
            location: "default"
        }).then((db: SQLiteObject) => {
            db.executeSql("CREATE TABLE IF NOT EXISTS AncientArchitecture (ID,ancientName,sceneryName)", {}).then((data) => {
                console.log("CREATE AncientArchitecture");
            }, (error) => {
                console.log(error);
            })
            db.executeSql(InsertQuery, {}).then((data) => {
                console.log("InsertQuery AncientArchitecture");
            }, (error) => {
                console.log(error);
            })
        }, (error) => {
            console.log(error);
        });
    }

    initialListDisInspectPosition(ID, PID, PositionName, Type) {
        var InsertQuery = "INSERT INTO DisInspectPosition (ID,PID,PositionName,Type) VALUES ('" + ID + "','" + PID + "','" + PositionName + "','" + Type + "')";
        this.sqlite.create({
            name: "data.db",
            location: "default"
        }).then((db: SQLiteObject) => {
            db.executeSql("CREATE TABLE IF NOT EXISTS DisInspectPosition (ID,PID,PositionName,Type)", {}).then((data) => {

            }, (error) => {
                console.log(error);
            })
            db.executeSql(InsertQuery, {}).then((data) => {

            }, (error) => {

            })
        }, (error) => {
        });
    }
    initialdetailData() {
        this.sqlite.create({
            name: "data.db",
            location: "default"
        }).then((db: SQLiteObject) => {
            db.executeSql("CREATE TABLE IF NOT EXISTS detail (recordId,parentId,location,damamgeDegreeSource,damamgeDegree,workTypeSource,workType,inspectDescription,picUrl,respair,respairDescription,inspectPerson,inspectTime)", {}).then((data) => {

            }, (error) => {
                console.log(error);
            })
        }, (error) => {
            console.log(error);
        });
    }

    insertDetailData(dataSource): Observable<string> {
        return Observable.create(observer => {
            var InsertQuery = "INSERT INTO detail (recordId,parentId,location,damamgeDegree,workType,inspectDescription,picUrl,respair,respairDescription,inspectPerson,inspectTime) VALUES ('" +
                dataSource.recordId + "','" + dataSource.parentId + "','" + dataSource.location + "','" + dataSource.damamgeDegree + "','" +
                dataSource.workType + "','" + dataSource.inspectDescription + "','" + dataSource.picUrl.join(",") + "','" +
                dataSource.respair + "','" + dataSource.respairDescription + "','" + dataSource.inspectPerson + "','" + dataSource.inspectTime + "')";
            this.sqlite.create({
                name: "data.db",
                location: "default"
            }).then((db: SQLiteObject) => {
                db.executeSql(InsertQuery, {}).then((data) => {
                    observer.next("1");
                }, (error) => {
                    observer.next(error);
                })
            }, (error) => {
                observer.next(error);
            });
        });
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