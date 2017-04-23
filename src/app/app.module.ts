import { NgModule, ErrorHandler } from '@angular/core';
import { Http } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { WeatherForecast } from '../pages/weatherForecast/weatherForecast';
import { CalculateWeather } from '../pages/calculateWeather/calculateWeather';
import { CalculateWeatherDtl } from '../pages/calculateWeather/CalculateWeatherDtl';
import { Setting } from '../pages/setting/setting';
import { About } from '../pages/about/about';
import { RptFeedback } from '../pages/rptFeedback/rptFeedback';
import { ForecastService } from '../services/forecast.service';
import { WeatherService } from '../services/weather.service';
import { FeedbackService } from '../services/feedback.service';
import { OT_GV, IGV } from './../globalVar/gv';
import { IonicStorageModule } from '@ionic/storage';
import { Network } from '@ionic-native/network';
import { AdMob } from '@ionic-native/admob';
import { GlobalFunc } from './../globalFunc/globalFunc';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate/ng2-translate';

@NgModule({
  declarations: [
    MyApp,
    WeatherForecast,
    CalculateWeather,
    CalculateWeatherDtl,
    Setting,
    About,
    RptFeedback
  ],
  imports: [
    IonicModule.forRoot(MyApp, {
          backButtonText: ' '
        }, {}
      ),
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
    Setting,
    About,
    RptFeedback
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    { provide: OT_GV, useValue: IGV },
    ForecastService,
    WeatherService,
    FeedbackService,
    AdMob,
    GlobalFunc,
    Network
  ]
})
export class AppModule { }

export function createTranslateLoader(http: Http) {
    return new TranslateStaticLoader(http, 'assets/i18n', '.json');
}

