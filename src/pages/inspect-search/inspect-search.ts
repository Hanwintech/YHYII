import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { inspectSearch } from './../../models/inspect/inspect-search.model';
import { SqlService } from "../../services/sqlite.service";

@IonicPage()
@Component({
  selector: 'page-inspect-search',
  templateUrl: 'inspect-search.html',
})
export class InspectSearchPage {
  dataSource;
  optionInspectArea;
  optionInspectScenery;
  optionAncientName;
  workTypeSource;
  constructor(public navCtrl: NavController, public navParams: NavParams, private sqlService: SqlService) {
    this.workTypeSource = [
      { key: "1", value: "瓦作" },
      { key: "2", value: "木作" },
      { key: "3", value: "油作" },
      { key: "4", value: "石作" }];
  }

  ionViewDidEnter() {
    this.dataSource=new inspectSearch();
    let sqlStr = `select Area.Name AS AreaName,Area.ID AS AreaID,
    AncientArchitecture.ID AS AncientArchitectureID,AncientArchitecture.SceneryName AS SceneryName,
    AncientArchitecture.Name AS AncientName,AncientArchitecture.ID AS AncientID,DiseaseRecord.workType AS WorkType,
    DiseaseRecord.inspectTime AS InspectTime,DiseaseRecord.inspectionPositionID AS InspectionPositionID from 
    Area inner join Scenery on Area.ID=Scenery.InspectAreaID inner join AncientArchitecture on Scenery.Name=AncientArchitecture.SceneryName 
    inner join DiseaseRecord on DiseaseRecord.ancientArcID=AncientArchitecture.ID order by AreaName desc`;
    this.sqlService.getSelectData(sqlStr).subscribe((res) => {
      let inspectData = {
        "structure": {
          "tables": {
            "SelectData": "(AreaName,AreaID,AncientArchitectureID,SceneryName,AncientName,AncientID,WorkType,InspectTime datetime,InspectionPositionID)"
          }
        },
        "data": {
          "inserts": {
            "SelectData": JSON.parse(JSON.stringify(res))
          }
        }
      }
      this.sqlService.initialData(inspectData).subscribe((res) => {

      }, (error) => { });
    }, (error) => { });
    //巡检区
    this.sqlService.getSelectData('select * from Area order by ID').subscribe((res) => {
      this.optionInspectArea = res;
    });
    //景区
    this.sqlService.getSelectData('select * from Scenery').subscribe((res) => {
      this.optionInspectScenery = res;
    });
    //古建筑
    this.sqlService.getSelectData('select * from AncientArchitecture').subscribe((res) => {
      this.optionAncientName = res;
    });
  }
  areaEvent(itemName) {
    this.sqlService.getSelectData('select * from Scenery where InspectAreaID="' + itemName + '"').subscribe((res) => {
      this.optionInspectScenery = res;
    });
  }
  sceneryEvent(itemName) {
    this.sqlService.getSelectData('select * from AncientArchitecture where SceneryName="' + itemName + '"').subscribe((res) => {
      this.optionAncientName = res;
    });
  }
  submitData() {
    this.navCtrl.push("SearchMainPage", this.dataSource);
  }
}
