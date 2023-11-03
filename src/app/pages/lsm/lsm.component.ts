import { Component } from '@angular/core';
import { coreFeature } from 'src/app/shared/models/projectCoreFeature.model';
import { ProjectFileModel } from 'src/app/shared/models/projectFile.model';
import { ImportService } from 'src/app/shared/services/import.service';
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


