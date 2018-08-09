import { Component, Inject } from '@angular/core';

import { OT_GV, IGV } from './../../globalVar/gv';
import { GlobalFunc } from './../../globalFunc/globalFunc';

import { Forecast } from "../../models/Forecast";
import { ForecastService } from "../../services/forecast.service";


@Component({
  selector: 'page-weatherForecast',
  templateUrl: 'weatherForecast.html'
})
export class WeatherForecast {
  forecastList: Forecast[] = [];

  monthMap: {};
  weekDayEnMap: {};
  weekDayZhMap: {};

  loading: any;

  constructor(
    @Inject(OT_GV) private IGV: IGV,
    public globalFunc: GlobalFunc,
    private forecastService: ForecastService) {
    this.monthMap = IGV.monthMap;
    this.weekDayEnMap = IGV.weekDayEnMap;
    this.weekDayZhMap = IGV.weekDayZhMap;
  }

  ngOnInit() {
    this.globalFunc.loadingPresent();

    this.globalFunc.logFirebase('forecast', 'weatherForecast');

    this.forecastService.getForecast()
      .then(forecastList => {
        this.forecastList = forecastList;
        for (var key in this.forecastList) {
          if (this.forecastList.hasOwnProperty(key)) {
            let currDate: Date = new Date();
            if (currDate.getDate() === this.forecastList[0].day) {
              currDate.setDate(currDate.getDate() + Number(key));
              this.forecastList[key].weekDay = Number(currDate.getDay());
            } else {
              currDate.setDate(currDate.getDate() + Number(key) + 1);
              this.forecastList[key].weekDay = Number(currDate.getDay());
            }
          }
        }
        this.globalFunc.loadingDismiss();
      }).catch(error => { this.globalFunc.presentSysErr(); this.globalFunc.loadingDismiss(); });
  }

  refreshForecast(refresher) {
    this.forecastService.getForecast()
      .then(forecastList => {
        this.forecastList = forecastList;
        for (var key in this.forecastList) {
          if (this.forecastList.hasOwnProperty(key)) {
            let currDate: Date = new Date();
            if (currDate.getDate() === this.forecastList[0].day) {
              currDate.setDate(currDate.getDate() + Number(key));
              this.forecastList[key].weekDay = Number(currDate.getDay());
            } else {
              currDate.setDate(currDate.getDate() + Number(key) + 1);
              this.forecastList[key].weekDay = Number(currDate.getDay());
            }
          }
        }
        refresher.complete();
      }).catch(error => { this.globalFunc.presentSysErr(); refresher.complete(); });
  }
}
