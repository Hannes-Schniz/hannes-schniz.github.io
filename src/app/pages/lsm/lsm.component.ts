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

  projectPage: ProjectFileModel = this.importService.getProjectPage('LSM')!;
  constructor(public importService: ImportService, public screenSize: IsMobileService){
  }

  getCell(element: coreFeature, header: string) {
    this.projectPage = this.importService.getProjectPage('LSM')!;
    if (header == 'feature') {
      return element.feature;
    }
    if (header == 'syntax') {
      return element.syntax;
    }
    if (header == 'explanation') {
      return element.explanation;
    }
    return '';
  }

  getTexts() {
    return this.importService.getProjectPage('LSM')!;
  }

  hidden() {
    return IsMobileService.hidePanel();
  }

  displayedColumns: string[] = ['feature', 'syntax', 'explanation'];
  dataSource = this.projectPage.coreFeatures;
}


