import { Injectable, Inject } from '@angular/core';
import { AlertController, LoadingController, ToastController } from 'ionic-angular';
import { AdMob, AdMobOptions } from '@ionic-native/admob';
import { OT_GV, IGV } from './../globalVar/gv';

@Injectable()
export class GlobalFunc {

    public loading: any;

    constructor(
        @Inject(OT_GV) private IGV: IGV,
        public alertCtrl: AlertController,
        public loadingCtrl: LoadingController,
        public adMob: AdMob,
        private toastCtrl: ToastController) { }

    // -------------  Alert -------------//
    presentSysErr() {
        if (this.IGV.gLangInd === 'zh') {
            let alert = this.alertCtrl.create({
                title: IGV.ERROR_ZH,
                subTitle: IGV.SORRY_SOMETHING_WRONG_ZH,
                buttons: ['OK']
            });
            alert.present();
        } else {
            let alert = this.alertCtrl.create({
                title: IGV.ERROR_EN,
                subTitle: IGV.SORRY_SOMETHING_WRONG_EN,
                buttons: ['OK']
            });
            alert.present();
        }
    }

    presentAlert(inputTitle: string, inputSubTitle: string) {
        let alert = this.alertCtrl.create({
            title: inputTitle,
            subTitle: inputSubTitle,
            buttons: ['OK']
        });
        alert.present();
    }

    // -------------  Loading -------------//
    loadingPresent() {
        this.loading = this.loadingCtrl.create({
            spinner: 'hide',
            content: `
                <div class="centerAndMiddle">
                    <img width="50%" height="50%" src="assets/img/logo/hkRain_ain.gif">
                </div>`,
        });
        this.loading.present();
    }

    loadingDismiss() {
        this.loading.dismiss();
    }

    public initAds() {
        if (!this.adMob) {
            console.log("AdMob not found.");
            return;
        }
        this.setAdMobIds();
        this.showBanner();
        this.showInterstitial();
    }

    public setAdMobIds() {
        if (/(android)/i.test(navigator.userAgent)) {
            IGV.AD_MOB_ID_BANNER = 'ca-app-pub-7668464781725150/1638150628';
            IGV.AD_MOB_ID_INTER = 'ca-app-pub-7668464781725150/8044611026';
        } else if (/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
            IGV.AD_MOB_ID_BANNER = 'ca-app-pub-7668464781725150/6068350226';
            IGV.AD_MOB_ID_INTER = 'ca-app-pub-7668464781725150/6428277028';
        } else {
            IGV.AD_MOB_ID_BANNER = '';
            IGV.AD_MOB_ID_INTER = '';
        }
    }

    public showBanner() {
        if (!/(android)/i.test(navigator.userAgent)
            && !/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
            return false;
        }

        let adBannerOptions: AdMobOptions = <AdMobOptions>{};

        adBannerOptions = {
            adId: IGV.AD_MOB_ID_BANNER,
            position: this.adMob.AD_POSITION.BOTTOM_CENTER,
            isTesting: IGV.isTestingAdmob,
            autoShow: true
            //adExtras: this.adExtras
        }

        this.adMob.createBanner(adBannerOptions);

        return true;
    }

    public showInterstitial() {
        if (!/(android)/i.test(navigator.userAgent)
            && !/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
            return false;
        }

        let adInterOptions: AdMobOptions = <AdMobOptions>{};

        adInterOptions = {
            adId: IGV.AD_MOB_ID_INTER,
            isTesting: IGV.isTestingAdmob,
            autoShow: true
            //adExtras: this.adExtras
        }

        this.adMob.prepareInterstitial(adInterOptions)
            .then(() => { this.adMob.showInterstitial(); });
        return true;
    }


    // -------------  Toast -------------//
    showToastNoNetwork() {
        if (this.IGV.gLangInd === 'zh') {
            let toast = this.toastCtrl.create({
                message: this.IGV.NO_NETWORK_CONNECTION_ZH,
                duration: 3000,
                position: 'top'
            });
            toast.present();
        } else {
            let toast = this.toastCtrl.create({
                message: this.IGV.NO_NETWORK_CONNECTION_EN,
                duration: 3000,
                position: 'top'
            });
            toast.present();
        }
    }

}