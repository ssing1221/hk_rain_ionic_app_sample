import { Component, Inject } from '@angular/core';

import { OT_GV, IGV } from './../../globalVar/gv';


@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class About {

  constructor(
    @Inject(OT_GV) private IGV: IGV) {

  }

}
