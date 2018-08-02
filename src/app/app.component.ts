import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
    rootPage:string = 'AddInfoPage';

  constructor(private platform: Platform, statusBar: StatusBar, private splashScreen: SplashScreen) {
    platform.ready().then(() => {
      this.platform.setDir('rtl', true)
      statusBar.styleDefault()
      this.splashScreen.hide()
    })
  }
}
