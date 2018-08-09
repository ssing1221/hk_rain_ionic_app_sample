import { NgModule, ErrorHandler } from '@angular/core';
import { Http } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { WeatherForecast } from '../pages/weatherForecast/weatherForecast';
import { CalculateWeather } from '../pages/calculateWeather/calculateWeather';
import { CalculateWeatherDtl } from '../pages/calculateWeather/calculateWeatherDtl';
import { Setting } from '../pages/setting/setting';
import { About } from '../pages/about/about';
import { RptFeedback } from '../pages/rptFeedback/rptFeedback';
import { SupportPage } from '../pages/support/support';
import { ForecastService } from '../services/forecast.service';
import { WeatherService } from '../services/weather.service';
import { FeedbackService } from '../services/feedback.service';
import { OT_GV, IGV } from './../globalVar/gv';
import { IonicStorageModule } from '@ionic/storage';
import { Network } from '@ionic-native/network';
import { AdMob } from '@ionic-native/admob';
import { GlobalFunc } from './../globalFunc/globalFunc';
import { AppRate } from '@ionic-native/app-rate';
import { Firebase } from '@ionic-native/firebase';
import { ChartsModule } from 'ng2-charts';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate/ng2-translate';
import { WeeklyPredict } from '../pages/weeklyPredict/weeklyPredict';

@NgModule({
  declarations: [
    MyApp,
    WeatherForecast,
    CalculateWeather,
    CalculateWeatherDtl,
    WeeklyPredict,
    Setting,
    About,
    RptFeedback,
    SupportPage
  ],
  imports: [
    IonicModule.forRoot(MyApp, {
          backButtonText: ' '
        },
    ),
    ChartsModule,
    BrowserModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    WeatherForecast,
    CalculateWeather,
    CalculateWeatherDtl,
    WeeklyPredict,
    Setting,
    About,
    RptFeedback,
    SupportPage
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    { provide: OT_GV, useValue: IGV },
    ForecastService,
    WeatherService,
    FeedbackService,
    AppRate,
    AdMob,
    Firebase,
    GlobalFunc,
    Network
  ]
})
export class AppModule { }

export function createTranslateLoader(http: Http) {
    return new TranslateStaticLoader(http, 'assets/i18n', '.json');
}

