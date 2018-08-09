import { Component, Inject } from '@angular/core';
import { TranslateService } from 'ng2-translate';
import { Storage } from '@ionic/storage';

import { OT_GV, IGV } from './../../globalVar/gv';
import { GlobalFunc } from './../../globalFunc/globalFunc';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'page-weeklyPredict',
  templateUrl: 'weeklyPredict.html'
})
export class WeeklyPredict {

  // All Chart
  public lineChartLegend:boolean = false;
  public lineChartType:string = 'line';
  public lineChartData:Array<any> = [
    {data: []}
  ];
  public lineChartLabels:Array<any> = [];
  public lineChartOptions:any = {
    responsive: true,
    scales: {
      xAxes: [{
          ticks: {
            autoSkip:false,
          }
      }]
  }
  };
  public lineChartColors:Array<any> = [
    { 
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: '#007ACC',
      pointBackgroundColor: '#007ACC',
      pointBorderColor: '#007ACC',
      pointHoverBackgroundColor: '#007ACC',
      pointHoverBorderColor: '#007ACC'
    }
  ];
  
  weeklySelectList: Array<Object> = [];
  selectedWeek: string;

  constructor(
    @Inject(OT_GV) public IGV: IGV,
    public globalFunc: GlobalFunc,
    private weatherService: WeatherService) {
  }

  ngOnInit() {

    this.globalFunc.logFirebase('predict', 'weeklyPredict');
    
    this.weeklySelectList = [];
    this.weatherService.getWeeklySelectList()
    .then(weeklySelectList => {

        this.weeklySelectList = weeklySelectList;
        let weeklySelect:any = this.weeklySelectList[0];
        this.selectedWeek = weeklySelect.value;
        let weeklySelectStr:string = weeklySelect.value;
        weeklySelectStr = weeklySelectStr.replace(new RegExp('/', 'g'), '.');

        this.weatherService.getWeeklyPredictResult(weeklySelectStr, IGV.filterYear)
        .then(result => {
          this.lineChartData =  [
            {data: result.weekPredictList}
          ];
          setTimeout(() => this.lineChartLabels = result.weekLabelList, 0);
          this.selectedWeek = weeklySelect.value;
        });
    });

  }

  weekChange(){
      let weeklySelectStr:string = this.selectedWeek;
      weeklySelectStr = weeklySelectStr.replace(new RegExp('/', 'g'), '.');
      this.weatherService.getWeeklyPredictResult(weeklySelectStr, IGV.filterYear)
      .then(result => {
          this.lineChartData =  [
            {data: result.weekPredictList, label: 'Raining %'}
          ];
          setTimeout(() => this.lineChartLabels = result.weekLabelList, 0);
      });
  }

}
