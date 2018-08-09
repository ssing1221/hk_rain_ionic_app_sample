
import { Component, ViewChild, Inject } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { TranslateService } from 'ng2-translate';
import { StatusBar, Splashscreen } from 'ionic-native';
import { Storage } from '@ionic/storage';
import { Network } from '@ionic-native/network';

import { OT_GV, IGV } from './../globalVar/gv';
import { GlobalFunc } from './../globalFunc/globalFunc';

import { WeatherForecast } from '../pages/weatherForecast/weatherForecast';
import { RptFeedback } from '../pages/rptFeedback/rptFeedback';
import { SupportPage } from '../pages/support/support';
import { CalculateWeather } from '../pages/calculateWeather/calculateWeather';
import { Setting } from '../pages/setting/setting';
import { About } from '../pages/about/about';
import { WeeklyPredict } from '../pages/weeklyPredict/weeklyPredict';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make CalculateWeather the root (or first) page
  rootPage: any = CalculateWeather;

  constructor(
    @Inject(OT_GV) public IGV: IGV,
    public platform: Platform,
    public menu: MenuController,
    public translate: TranslateService,
    public storage: Storage,
    public globalFunc: GlobalFunc,
    public network: Network
  ) {
    this.initializeApp(translate);
  }

  initializeApp(translate) {
    this.globalFunc.loadingPresent();
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
      this.globalFunc.loadingDismiss();

      this.translate.use('zh');
      this.IGV.gLangInd = 'zh';

      this.globalFunc.logFirebase('open_app', 'home');

      // For local storage
      this.storage.ready().then(() => {

        // Get mySetting
        this.storage.get('mySetting').then((val) => {
          if (val !== null) {
            this.translate.use(val.langInd);
            this.IGV.gLangInd = val.langInd;
            this.IGV.filterYear = val.filterYear;
          } else {
            // Set mySetting
            this.storage.set('mySetting', { langInd: 'zh', filterYear: 45 });
          }

          // watch network for a disconnect
          this.network.onDisconnect().subscribe(() => {
            this.globalFunc.showToastNoNetwork();
          });

        });
      }, (error) => {
        this.globalFunc.presentSysErr();
      });

      // For adMob
      this.globalFunc.initAds();

    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    let toPage: any;
    switch (page) {
      case 'WeatherForecast': {
        toPage = WeatherForecast;
        this.globalFunc.removeBanner();
        break;
      }
      case 'CalculateWeather': {
        toPage = CalculateWeather;
        this.globalFunc.showBanner();
        break;
      }
      case 'WeeklyPredict': {
        toPage = WeeklyPredict;
        break;
      }
      case 'Setting': {
        toPage = Setting;
        break;
      }
      case 'About': {
        toPage = About;
        break;
      }
      case 'RptFeedback': {
        toPage = RptFeedback;
        break;
      }
      case 'Support': {
        toPage = SupportPage;
        break;
      }
      default: {
        toPage = CalculateWeather;
        break;
      }
    }
    this.nav.setRoot(toPage);
  }

  changeLangInd(lang) {
    this.translate.use(lang);
    this.IGV.gLangInd = lang;

    this.storage.ready().then(() => {
      this.storage.set('mySetting', { langInd: lang, filterYear: this.IGV.filterYear });
    }, (error) => {
      this.globalFunc.presentSysErr();
    });

    this.menu.close();
  }


}
