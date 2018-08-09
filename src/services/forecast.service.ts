import { Injectable } from '@angular/core';

import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Forecast } from "../models/Forecast";

@Injectable()
export class ForecastService {

    private baserUrl = 'http://www.hkrain.com/api/';  // URL to web api

    constructor(private http: Http) { }

    getForecast(): Promise<Forecast[]> {
        return this.http.get(this.baserUrl + '/' + 'getForecast')
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    getSingleForecast(month: number, day: number): Promise<Forecast> {
        return this.http.get(this.baserUrl + '/' + 'getSingleForecast' + '/' + month + '/ ' + day)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    getAllForecast(): Promise<Forecast[]> {
        return this.http.get(this.baserUrl + '/' + 'getAllForecast')
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    private handleError(error: any) {
        console.error('Something went wrong...', console.log(JSON.stringify(error)));
        return Promise.reject(error.message || error);
    }

}