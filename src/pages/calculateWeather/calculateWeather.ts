import { Component, OnInit, Inject } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Weather } from "../../models/Weather";
import { ResultWeather } from "../../models/ResultWeather";
import { Forecast } from "../../models/Forecast";
import { WeatherService } from "../../services/weather.service";
import { ForecastService } from "../../services/forecast.service";
import { CalculateWeatherDtl } from "../../pages/calculateWeather/CalculateWeatherDtl";
import { OT_GV, IGV } from './../../globalVar/gv';
import { GlobalFunc } from './../../globalFunc/globalFunc';

@Component({
    selector: 'my-calculateWeather',
    templateUrl: 'calculateWeather.html',
})

export class CalculateWeather implements OnInit {

    selectedFilterYear: number;

    // 1111111 calculate weather 1111111111
    error: any;
    selectYearList: Array<Object>;
    selectMonthList: Array<Object>;
    selectDayList: Array<Object>;
    selectedYear: number;
    selectedMonth: number;
    selectedDay: number;
    dayDisable: boolean;
    weatherResult: ResultWeather;
    weatherIconPath: string;
    maxRainValue: number;
    showResult: boolean;
    forecast: Forecast;
    showForecast: boolean;
    weatherDtlList: Weather[];

    // 22222222 calculate weather 2222222222 
    error2: any;
    selectYearList2: Array<Object>;
    selectMonthList2: Array<Object>;
    selectDayList2: Array<Object>;
    selectedYear2: number;
    selectedMonth2: number;
    selectedDay2: number;
    dayDisable2: boolean;
    weatherResult2: ResultWeather;
    weatherIconPath2: string;
    maxRainValue2: number;
    showResult2: boolean;
    showCal2: boolean;
    forecast2: Forecast;
    showForecast2: boolean;
    weatherDtlList2: Weather[];

    monthMap: {};
    weekDayEnMap: {};
    weekDayZhMap: {};

    loading: any;

    constructor(
        @Inject(OT_GV) private IGV: IGV,
        private weatherService: WeatherService,
        private forecastService: ForecastService,
        public navCtrl: NavController,
        public globalFunc: GlobalFunc) {

        this.monthMap = IGV.monthMap;
        this.weekDayEnMap = IGV.weekDayEnMap;
        this.weekDayZhMap = IGV.weekDayZhMap;

        // Set filter year from gloalVar
        this.selectedFilterYear = IGV.filterYear;

    }

    resetForm1() {
        // 11111111
        this.selectYearList = null;
        this.selectMonthList = null;
        this.selectDayList = null;
        this.selectedYear = null;
        this.selectedMonth = null;
        this.selectedDay = null;
        this.dayDisable = true;
        this.weatherResult = null;
        this.showResult = false;
        this.forecast = null;
        this.showForecast = false;
        this.weatherDtlList = null;
    }

    resetForm2() {
        // 22222222
        this.selectYearList2 = null;
        this.selectMonthList2 = null;
        this.selectDayList2 = null;
        this.selectedYear2 = null;
        this.selectedMonth2 = null;
        this.selectedDay2 = null;
        this.dayDisable2 = true;
        this.weatherResult2 = null;
        this.showResult2 = false;
        this.showCal2 = false;
        this.forecast2 = null;
        this.showForecast2 = false;
        this.weatherDtlList2 = null;
    }

    init1() {
        let currDate = new Date();
        this.selectYearList = [
            { value: currDate.getFullYear(), label: currDate.getFullYear() },
            { value: Number(currDate.getFullYear()) + 1, label: Number(currDate.getFullYear()) + 1 },
            { value: Number(currDate.getFullYear()) + 2, label: Number(currDate.getFullYear()) + 2 }
        ];
        this.selectedYear = this.selectYearList[0]['label'];

        this.selectMonthList = this.getSelectMonthList(this.selectedYear);
        this.selectedMonth = Number(currDate.getMonth()) + 1;

        this.monthChange();
    }
    init2() {
        let currDate = new Date();
        this.selectYearList2 = [
            { value: currDate.getFullYear(), label: currDate.getFullYear() },
            { value: Number(currDate.getFullYear()) + 1, label: Number(currDate.getFullYear()) + 1 },
            { value: Number(currDate.getFullYear()) + 2, label: Number(currDate.getFullYear()) + 2 }
        ];
        this.selectedYear2 = this.selectYearList2[0]['label'];

        this.selectMonthList2 = this.getSelectMonthList(this.selectedYear2);
        this.selectedMonth2 = Number(currDate.getMonth()) + 1;

        this.monthChange2();
    }

    ngOnInit() {

        this.resetForm1();
        this.resetForm2();

        this.init1();
        this.init2();

    }

    // ------------- Component Change -------------//
    yearChange() {
        this.selectedMonth = null;
        this.selectedDay = null;
        this.selectDayList = null;
        this.selectMonthList = this.getSelectMonthList(this.selectedYear);

        this.dayDisable = true;
    }
    yearChange2() {
        this.selectedYear2 = +this.selectedYear2;
        this.selectedMonth2 = null;
        this.selectedDay2 = null;
        this.selectDayList2 = null;
        this.selectMonthList2 = this.getSelectMonthList(this.selectedYear2);

        this.dayDisable = true;
    }

    monthChange() {
        if (this.selectedMonth !== null) {
            this.selectDayList = this.getSelectDayList(this.selectedYear, this.selectedMonth);
            this.selectedDay = null;
            this.dayDisable = false;
        } else {
            this.selectDayList = null;
            this.selectedDay = null;
            this.dayDisable = true;
        }
    }
    monthChange2() {
        this.selectedMonth2 = +this.selectedMonth2;
        if (this.selectedMonth2 !== null) {
            this.selectDayList2 = this.getSelectDayList(this.selectedYear2, this.selectedMonth2);
            this.selectedDay2 = null;
            this.dayDisable2 = false;
        } else {
            this.selectDayList2 = null;
            this.selectedDay2 = null;
            this.dayDisable2 = true;
        }
    }

    getSelectMonthList(selectYear: number) {
        let monthList = [];
        let currDate = new Date();
        if (Number(currDate.getFullYear()) !== selectYear) {
            for (var i = 1; i <= 12; i++) {
                var month = { value: i, label: i };
                monthList.push(month);
            }
        } else {
            let currMonth: number = Number(currDate.getMonth()) + 1;
            for (var i = currMonth; i <= 12; i++) {
                var month = { value: i, label: i };
                monthList.push(month);
            }
        }
        return monthList;
    }

    getSelectDayList(selectYear: number, selectMonth: number) {
        let dayList = [];
        let currDate = new Date();
        let currYear = Number(currDate.getFullYear());
        let currMonth: number = Number(currDate.getMonth()) + 1;

        if (currYear === selectYear && currMonth === selectMonth) {
            let currDay: number = Number(currDate.getDate());
            for (var i = currDay; i <= this.daysInMonth(selectMonth, selectYear); i++) {
                var day = { value: i, label: i };
                dayList.push(day);
            }
        } else {
            for (var i = 1; i <= this.daysInMonth(selectMonth, selectYear); i++) {
                var day = { value: i, label: i };
                dayList.push(day);
            }
        }
        return dayList;
    }

    // ------------- Component Logic -------------//

    daysInMonth(month, year) {
        return new Date(year, month, 0).getDate();
    }


    calWeather() {
        this.globalFunc.loadingPresent();

        //check forecast Date
        let isForecast: boolean = false;
        let inputDate: Date = new Date(Number(this.selectedYear),
            Number(this.selectedMonth) - 1, Number(this.selectedDay));

        for (var i = 0; i < 9; i++) {
            let currDate: Date = new Date();
            currDate.setDate(currDate.getDate() + i);
            currDate.setHours(0, 0, 0, 0);
            if (inputDate.getTime() === currDate.getTime()) {
                isForecast = true;
                break;
            }
        }

        // calculate week day
        let weekDay = Number(new Date(Number(this.selectedYear),
            Number(this.selectedMonth) - 1, Number(this.selectedDay)).getDay());

        if (isForecast) {
            this.showResult = false;
            this.forecastService.getSingleForecast(Number(this.selectedMonth), Number(this.selectedDay))
                .then(forecast => {
                    this.forecast = forecast;
                    this.forecast.weekDay = weekDay;
                    this.showForecast = true;
                    this.globalFunc.loadingDismiss();
                    this.globalFunc.showInterstitial();
                }).catch(error => { this.globalFunc.presentSysErr(); this.globalFunc.loadingDismiss(); });
        } else {
            this.showForecast = false;
            // calculate weather
            this.weatherService
                .getCalWeather(this.selectedYear, this.selectedMonth, this.selectedDay, this.selectedFilterYear)
                .then(result => {
                    this.weatherResult = result;
                    this.weatherIconPath = this.getCalWeatherIconPath(this.weatherResult);
                    this.maxRainValue = Math.max(Number(this.weatherResult.drizzle), Number(this.weatherResult.light)),
                        Number(this.weatherResult.moderate), Number(this.weatherResult.heavy),
                        Number(this.weatherResult.violent), Number(this.weatherResult.torrential);

                    this.weatherResult.weekDay = weekDay;
                    this.showResult = true;
                    this.globalFunc.loadingDismiss();
                    this.globalFunc.showInterstitial();
                }).catch(error => { this.globalFunc.presentSysErr(); this.globalFunc.loadingDismiss(); });
        }
    }
    calWeather2() {

        this.globalFunc.loadingPresent();

        //check forecast Date
        let isForecast2: boolean = false;
        let inputDate2: Date = new Date(Number(this.selectedYear2),
            Number(this.selectedMonth2) - 1, Number(this.selectedDay2));

        for (var i = 0; i < 9; i++) {
            let currDate: Date = new Date();
            currDate.setDate(currDate.getDate() + i);
            currDate.setHours(0, 0, 0, 0);
            if (inputDate2.getTime() === currDate.getTime()) {
                isForecast2 = true;
                break;
            }
        }

        // calculate week day
        let weekDay = Number(new Date(Number(this.selectedYear2),
            Number(this.selectedMonth2) - 1, Number(this.selectedDay2)).getDay());

        if (isForecast2) {
            this.showResult2 = false;
            this.forecastService.getSingleForecast(Number(this.selectedMonth2), Number(this.selectedDay2))
                .then(forecast => {
                    this.forecast2 = forecast;
                    this.forecast2.weekDay = weekDay;
                    this.showForecast2 = true;
                    this.globalFunc.loadingDismiss();
                }).catch(error => { this.globalFunc.presentSysErr(); this.globalFunc.loadingDismiss(); });
        } else {
            this.showForecast2 = false;
            // calculate weather
            this.weatherService
                .getCalWeather(this.selectedYear2, this.selectedMonth2, this.selectedDay2, this.selectedFilterYear)
                .then(result => {
                    this.weatherResult2 = result;
                    this.weatherIconPath2 = this.getCalWeatherIconPath(this.weatherResult2);
                    this.maxRainValue2 = Math.max(Number(this.weatherResult2.drizzle), Number(this.weatherResult2.light)),
                        Number(this.weatherResult2.moderate), Number(this.weatherResult2.heavy),
                        Number(this.weatherResult2.violent), Number(this.weatherResult2.torrential);

                    this.weatherResult2.weekDay = weekDay;
                    this.showResult2 = true;
                    this.globalFunc.loadingDismiss();
                }).catch(error => { this.globalFunc.presentSysErr(); this.globalFunc.loadingDismiss(); });
        }
    }

    addCal2() {
        this.showCal2 = true;
    }

    toggleMore() {
        this.navCtrl.push(CalculateWeatherDtl, {
            selectedMonth: this.selectedMonth,
            selectedDay: this.selectedDay,
            selectedFilterYear: this.selectedFilterYear
        });
    }

    toggleMore2(event, item) {
        this.navCtrl.push(CalculateWeatherDtl, {
            selectedMonth: this.selectedMonth2,
            selectedDay: this.selectedDay2,
            selectedFilterYear: this.selectedFilterYear
        });
    }

    getCalWeatherIconPath(weatherResult: ResultWeather) {
        let iconPath: string = null;

        if (weatherResult.rainYear < this.IGV.RAIN_SUN_THRESHOLD) {
            iconPath = 'assets/img/icon/' + this.IGV.SUNSHINE + '.png';
        } else {
            if (this.isTorrential(weatherResult) || this.isViolent(weatherResult)) {
                iconPath = 'assets/img/icon/' + this.IGV.VIOLENT_TORRENTIAL + '.png';
            } else if (this.isHeavy(weatherResult)) {
                iconPath = 'assets/img/icon/' + this.IGV.HEAVY + '.png';
            } else if (this.isModerate(weatherResult)) {
                iconPath = 'assets/img/icon/' + this.IGV.MODERATE + '.png';
            } else if (this.isLigth(weatherResult)) {
                iconPath = 'assets/img/icon/' + this.IGV.LIGHT + '.png';
            } else if (this.isDrizzle(weatherResult)) {
                iconPath = 'assets/img/icon/' + this.IGV.DRIZZLE + '.png';
            }
        }
        return iconPath;
    }

    isDrizzle(weatherResult: ResultWeather) {
        if (weatherResult.drizzle >= weatherResult.light
            && weatherResult.drizzle >= weatherResult.moderate
            && weatherResult.drizzle >= weatherResult.heavy
            && weatherResult.drizzle >= weatherResult.violent
            && weatherResult.drizzle >= weatherResult.torrential) {
            return true;
        } else {
            return false;
        }
    }

    isLigth(weatherResult: ResultWeather) {
        if (weatherResult.light >= weatherResult.drizzle
            && weatherResult.light >= weatherResult.moderate
            && weatherResult.light >= weatherResult.heavy
            && weatherResult.light >= weatherResult.violent
            && weatherResult.light >= weatherResult.torrential) {
            return true;
        } else {
            return false;
        }
    }

    isModerate(weatherResult: ResultWeather) {
        if (weatherResult.moderate >= weatherResult.drizzle
            && weatherResult.moderate >= weatherResult.light
            && weatherResult.moderate >= weatherResult.heavy
            && weatherResult.moderate >= weatherResult.violent
            && weatherResult.moderate >= weatherResult.torrential) {
            return true;
        } else {
            return false;
        }
    }

    isHeavy(weatherResult: ResultWeather) {
        if (weatherResult.heavy >= weatherResult.drizzle
            && weatherResult.heavy >= weatherResult.light
            && weatherResult.heavy >= weatherResult.moderate
            && weatherResult.heavy >= weatherResult.violent
            && weatherResult.heavy >= weatherResult.torrential) {
            return true;
        } else {
            return false;
        }
    }

    isViolent(weatherResult: ResultWeather) {
        if (weatherResult.violent >= weatherResult.drizzle
            && weatherResult.violent >= weatherResult.light
            && weatherResult.violent >= weatherResult.moderate
            && weatherResult.violent >= weatherResult.heavy
            && weatherResult.violent >= weatherResult.torrential) {
            return true;
        } else {
            return false;
        }
    }

    isTorrential(weatherResult: ResultWeather) {
        if (weatherResult.torrential >= weatherResult.drizzle
            && weatherResult.torrential >= weatherResult.light
            && weatherResult.torrential >= weatherResult.moderate
            && weatherResult.torrential >= weatherResult.heavy
            && weatherResult.torrential >= weatherResult.violent) {
            return true;
        } else {
            return false;
        }
    }

    backToCal() {
        this.showResult = false;
        this.showForecast = false;
    }
    backToCal2() {
        this.showResult2 = false;
        this.showForecast2 = false;
    }


}