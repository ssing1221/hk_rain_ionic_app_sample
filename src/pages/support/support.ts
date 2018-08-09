import { Component, Inject } from '@angular/core';
import { AppRate } from '@ionic-native/app-rate';

import { OT_GV, IGV } from './../../globalVar/gv';
import { GlobalFunc } from './../../globalFunc/globalFunc';

@Component({
  selector: 'page-support',
  templateUrl: 'support.html'
})
export class SupportPage {

  isIOS: boolean;
  isAndroid: boolean;

  appID: string = 'com.hkrain0730';

  constructor(
    @Inject(OT_GV) public IGV: IGV,
    public globalFunc: GlobalFunc,
    private appRate: AppRate
  ) {
    if (/(android)/i.test(navigator.userAgent)) {
      this.isAndroid = true;
      this.isIOS = false;
    } else if (/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
      this.isAndroid = false;
      this.isIOS = true;
    }
  }

  openStoreRate() {
    this.appRate.preferences.storeAppURL = {
      ios: this.appID,
      android: 'market://details?id=' + this.appID,
    };
    this.appRate.promptForRating(true);
  }

  showRewardVideoAd() {
    this.globalFunc.showRewardVideoAd();
  }

  showInterstitialImmd() {
    this.globalFunc.showInterstitialImmd();
  }

  showInterstitialVideoImmd() {
    this.globalFunc.showInterstitialVideoImmd();
  }

}
