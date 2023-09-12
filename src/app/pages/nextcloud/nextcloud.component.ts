import { Component } from '@angular/core';
import { coreFeature } from 'src/app/shared/models/projectCoreFeature.model';
import { ProjectFileModel } from 'src/app/shared/models/projectFile.model';
import { ImportService } from 'src/app/shared/services/import.service';
import { IsMobileService } from 'src/app/shared/services/is-mobile.service';

@Component({
  selector: 'app-nextcloud',
  templateUrl: './nextcloud.component.html',
  styleUrls: ['./nextcloud.component.scss']
})
export class NextcloudComponent {
  projectPage: ProjectFileModel = this.importService.getProjectPage('Nextcloud')!;
  constructor(public importService: ImportService, public screenSize: IsMobileService){
  }

  getTexts() {
    return this.importService.getProjectPage('Nextcloud')!;
  }

  hidden() {
    return IsMobileService.hidePanel();
  }
}
