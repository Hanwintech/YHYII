import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { Camera } from '@ionic-native/camera';
import { FileTransfer } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { Device } from '@ionic-native/device';
import { LoginPageModule } from '../pages/login/login.module';
import { GlobalCache } from './../services/globalCache.service';
import { ApiService } from './../services/api.service';
import { InspectService } from './../services/inspect.service';
import { _baseService } from './../services/_base.service';
import { StatisticsService } from './../services/statistics.service';
import { nativeImgService } from "./../services/nativeImg.service";
import { PreviewPicturePage } from "./../shared/preview-picture/preview-picture";
import { MLabelComponent } from './../shared/m-label/m-label';
import { BackButtonService } from "../services/backButton.service";
import { MyPage } from '../pages/my/my';
import { InspectIndexPage } from '../pages/inspect/index/inspect-index';
import { InspectMorePage } from '../pages/inspect/more/inspect-more';
import { TZIndexPage } from '../pages/tz/index/tz-index';
import { Geolocation } from '@ionic-native/geolocation';

@NgModule({
  declarations: [
    MyApp,
    PreviewPicturePage,
    MLabelComponent,
    InspectIndexPage,
    TZIndexPage,
    MyPage,
    InspectMorePage
  ],
  imports: [
    BrowserModule,
    IonicImageViewerModule,
    IonicModule.forRoot(MyApp, { backButtonText: '', tabsHideOnSubPages: true, }),
    IonicStorageModule.forRoot(),
    HttpModule,
    LoginPageModule,
  ],
  bootstrap: [
    IonicApp
  ],
  entryComponents: [
    MyApp,
    PreviewPicturePage,
    MLabelComponent,
    InspectIndexPage,
    TZIndexPage,
    MyPage,
    InspectMorePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Device,
    GlobalCache,
    ApiService,
    InspectService,
    _baseService,
    StatisticsService,
    FileTransfer,
    Geolocation,
    File,
    nativeImgService,
    BackButtonService,
    Camera,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
  ]
})

export class AppModule { }