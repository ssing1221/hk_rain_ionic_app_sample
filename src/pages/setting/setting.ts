import { Component, Inject } from '@angular/core';
import { TranslateService } from 'ng2-translate';
import { Storage } from '@ionic/storage';

import { OT_GV, IGV } from './../../globalVar/gv';
import { GlobalFunc } from './../../globalFunc/globalFunc';

@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html'
})
export class Setting {
  selectedFilterYear;
  selectFilterYearList: Array<Object>;

  loading: any;

  constructor(
    @Inject(OT_GV) public IGV: IGV,
    public globalFunc: GlobalFunc,
    public translate: TranslateService,
    public storage: Storage) {

    this.globalFunc.loadingPresent();
    // Set filter year from gloalVar
    this.selectedFilterYear = this.IGV.filterYear;

    this.selectFilterYearList = [];
    for (let i = 5; i <= 120; i += 5) {
      let year = { value: i, label: i };
      this.selectFilterYearList.push(year);
    }

    this.globalFunc.loadingDismiss();
  }


  changeFilterYear() {

    this.globalFunc.logFirebase('changeFilterYear', 'setting');

    this.IGV.filterYear = this.selectedFilterYear;

    this.storage.ready().then(() => {
      this.storage.set('mySetting', { langInd: this.IGV.gLangInd, filterYear: this.IGV.filterYear });
    }, (error) => {
      this.globalFunc.presentSysErr();
    });

    if (this.IGV.gLangInd === 'en') {
      this.globalFunc.presentAlert(this.IGV.SUBMITTED_SUCCESSFULLY_EN, this.IGV.NO_OF_YEARS_CHANGED_TO_EN + this.selectedFilterYear);
    } else {
      this.globalFunc.presentAlert(this.IGV.SUBMITTED_SUCCESSFULLY_ZH, this.IGV.NO_OF_YEARS_CHANGED_TO_ZH + this.selectedFilterYear);
    }
  }

  resetting() {
    this.IGV.filterYear = 45;
    this.selectedFilterYear = 45;
    this.translate.use('zh');
    this.IGV.gLangInd = 'zh';

    this.changeFilterYear();
  }

}
