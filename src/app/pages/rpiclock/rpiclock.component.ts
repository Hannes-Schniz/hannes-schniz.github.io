import { Component } from '@angular/core';
import { ProjectFileModel } from 'src/app/shared/models/projectFile.model';
import { ImportService } from 'src/app/shared/services/import.service';
import { IsMobileService } from 'src/app/shared/services/is-mobile.service';

@Component({
  selector: 'app-rpiclock',
  templateUrl: './rpiclock.component.html',
  styleUrls: ['./rpiclock.component.scss']
})
export class RPIClockComponent {
  project = 'RPICLock';
  constructor(public screenSize: IsMobileService){
  }

  hidden() {
    return IsMobileService.hidePanel();
  }
}
