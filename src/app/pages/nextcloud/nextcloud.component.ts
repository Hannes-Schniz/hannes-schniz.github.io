import { Component } from '@angular/core';
import { IsMobileService } from 'src/app/shared/services/is-mobile.service';

@Component({
  selector: 'app-nextcloud',
  templateUrl: './nextcloud.component.html',
  styleUrls: ['./nextcloud.component.scss']
})
export class NextcloudComponent {
  project = 'Nextcloud';
  constructor(public screenSize: IsMobileService){
  }

  hidden() {
    return IsMobileService.hidePanel();
  }
}
