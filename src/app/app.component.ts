import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Dom',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Pregled Gradiv',
      url: '/list',
      icon: 'list'
    },
    {
      title: 'Priljubljene',
      url: '/favorites',
      icon: 'heart'
    },
    {
      title: 'Napredno Iskanje',
      url: '/advanced',
      icon: 'search'
    },
    {
      title: 'Brskanje',
      url: '/browse',
      icon: 'browsers'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
