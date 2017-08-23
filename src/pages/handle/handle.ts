import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform, IonicPage, AlertController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { MapService } from './../../services/map.service';

import { IHttpCommonResponse } from './../../models/httpCommonResponse.model';
import { ProblemInfo } from './../../models/map/problemInfo.model';

declare var BMap;

@IonicPage()
@Component({
  selector: 'page-handle',
  templateUrl: 'handle.html',
})
export class HandlePage {
  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('header') header;
  public map: any;
  public longitude: number;
  public latitude: number;
  public dataSource: ProblemInfo[];
  public selectedId: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public geolocation: Geolocation,
    public mapService: MapService,
    public alertCtrl: AlertController) { }

  handle() {
    this.navCtrl.push("UrgeHandlePage");
  }

    //跳转至添加巡查页面
  addHandleInspect() {
     if (this.selectedId) {
      this.navCtrl.push("AddInpectHandlePage", this.selectedId);
    } else {
      let alert = this.alertCtrl.create({
        title: '发生错误！',
        subTitle: "未选择巡查点！",
        buttons: ['OK']
      });
      alert.present();
    }
  }


  ionViewDidLoad() {
    this.map = new BMap.Map(this.mapElement.nativeElement, { enableMapClick: true });//创建地图实例
    this.map.enableScrollWheelZoom();//启动滚轮放大缩小，默认禁用
    this.map.enableContinuousZoom();//连续缩放效果，默认禁用
    let point = new BMap.Point(120.78816918621, 31.344647252832);//坐标可以通过百度地图坐标拾取器获取
    this.map.centerAndZoom(point, 14);//设置中心和地图显示级别     
    this.getLocation();
  }

    getLocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.longitude = resp.coords.longitude;
      this.latitude = resp.coords.latitude;
      let point = new BMap.Point(this.longitude, this.latitude);
      let convertor = new BMap.Convertor();
      let pointArr = [];
      let mkr = [];
      pointArr.push(point);
      convertor.translate(pointArr, 1, 5, function (data) {
        if (data.status === 0) {
          //this.map.clearOverlays();  //清除标注
          // 添加原来点的标注
          var myLocation = new BMap.Icon("assets/map/my-location.ico", new BMap.Size(34, 35));
          let mkr = new BMap.Marker(data.points[0], {
            icon: myLocation,
            enableClicking: true
          });
          let mkNear = [];
          this.mapService.getProblemInfo(data.points[0].lng, data.points[0].lat)
            .subscribe(res => {
              console.log(res);
              let myIcon = new BMap.Icon("assets/map/position.png", new BMap.Size(34, 35));
              let myIconSelected = new BMap.Icon("assets/map/positionSelected.png", new BMap.Size(34, 35));
              let list = res as IHttpCommonResponse<ProblemInfo[]>
              this.dataSource = list.data;
              for (let i = 0; i < this.dataSource.length; i++) {
                mkNear[i] = new BMap.Marker(new BMap.Point(this.dataSource[i].longitude, this.dataSource[i].latitude), {
                  icon: myIcon,
                  enableMassClear: false,
                  enableClicking: true
                });
                this.map.addOverlay(mkNear[i]);
                let lblString = "<div id='handle" + this.dataSource[i].id + "' class='positionContain'><div  style='border-bottom:1px solid #fff;padding:0.2em 0.4em;'>" + this.dataSource[i].propertyName + "</div><div style='padding:0.2em 0.4em;'>出现问题未处理</div></div>";
                var label = new BMap.Label(lblString, { offset: new BMap.Size(38, -40) });
                label.setStyle({
                  border: "none",
                  fontSize: "1em",
                  color: "#fff",
                  borderRadius: "0.3em",
                  background: "none"
                });
                mkNear[i].setLabel(label);
                let that = this;
                label.addEventListener("click", function (e) {
                  for (let m = 0; m < that.dataSource.length; m++) {
                    document.getElementById("handle" + that.dataSource[m].id + "").removeAttribute("name");
                    mkNear[m].setIcon(myIcon);
                  }
                  document.getElementById("handle" + that.dataSource[i].id + "").setAttribute("name", "selected");
                  that.selectedId = that.dataSource[i].id;
                  mkNear[i].setIcon(myIconSelected)
                });
              }
            },
            error => {
              alert(error);
            });
          this.map.addOverlay(mkr);
          this.map.panTo(data.points[0]);
          // var label1 = new BMap.Label("", { offset: new BMap.Size(20, -10) });
          // mkr.setLabel(label1);
        }
      }.bind(this));
    }).catch((error) => {
      console.log('Error getting location', error);
    });

    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
    });
  }


}

