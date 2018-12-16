import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpModule} from '@angular/http';


import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {ApiDataService} from './services/api-data.service';
import { IonicStorageModule } from '@ionic/storage';

import {File} from '@ionic-native/file/ngx';
import {FileTransfer} from '@ionic-native/file-transfer/ngx';
import { DocumentViewer } from '@ionic-native/document-viewer/ngx';


import { HTTP } from '@ionic-native/http/ngx';
import { Toast } from '@ionic-native/toast/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    HttpModule,
    AppRoutingModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HTTP,
    Toast,
    File,
    FileTransfer,
    DocumentViewer,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    ApiDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
