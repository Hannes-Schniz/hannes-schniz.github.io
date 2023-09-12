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
  projectPage: ProjectFileModel = this.importService.getProjectPage('RPICLock')!;
  constructor(public importService: ImportService, public screenSize: IsMobileService){
  }

  getTexts() {
    return this.importService.getProjectPage('RPICLock')!;
  }
}
