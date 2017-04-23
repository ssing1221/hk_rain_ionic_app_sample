import { Component, Inject } from '@angular/core';

import { OT_GV, IGV } from './../../globalVar/gv';
import { GlobalFunc } from './../../globalFunc/globalFunc';

import { Feedback } from "../../models/Feedback";
import { FeedbackService } from "../../services/feedback.service";


@Component({
  selector: 'page-rptFeedback',
  templateUrl: 'rptFeedback.html'
})
export class RptFeedback {
  feedback: Feedback;
  loading: any;

  constructor(
    @Inject(OT_GV) private IGV: IGV,
    public globalFunc: GlobalFunc,
    private feedbackService: FeedbackService) {
  }


  ngOnInit() {
    this.globalFunc.loadingPresent();
    this.feedback = new Feedback();
    this.feedback.name = null;
    this.feedback.email = null;
    this.feedback.comment = null;
    this.feedback.submitDate = null;
    this.globalFunc.loadingDismiss();
  }

  submitFeedback() {
    this.globalFunc.loadingPresent();
    this.feedbackService
      .checkFeedback(this.feedback)
      .then(response => {
        if (this.IGV.gLangInd === 'en') {
          this.globalFunc.presentAlert(this.IGV.SUBMITTED_SUCCESSFULLY_EN, null);
        } else {
          this.globalFunc.presentAlert(this.IGV.SUBMITTED_SUCCESSFULLY_ZH, null);
        }
        this.feedback = new Feedback();
        this.feedback.name = null;
        this.feedback.email = null;
        this.feedback.comment = null;
        this.feedback.submitDate = null
        this.globalFunc.loadingDismiss();
      })
      .catch(error => { this.globalFunc.presentSysErr(); this.globalFunc.loadingDismiss(); }); // TODO: Display error message
  }
}
