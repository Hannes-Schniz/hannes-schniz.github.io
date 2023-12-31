import { Component } from '@angular/core';
import { IsMobileService } from 'src/app/shared/services/is-mobile.service';

@Component({
  selector: 'app-lsm',
  templateUrl: './lsm.component.html',
  styleUrls: ['./lsm.component.scss']
})
export class LsmComponent {

  project = 'LSM';

  constructor(public screenSize: IsMobileService){
  }

  hidden() {
    return IsMobileService.hidePanel();
  }
}


