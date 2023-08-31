import { Component } from '@angular/core';
import { coreFeature } from 'src/app/shared/models/projectCoreFeature.model';
import { ProjectFileModel } from 'src/app/shared/models/projectFile.model';
import { ImportService } from 'src/app/shared/services/import.service';

@Component({
  selector: 'app-lsm',
  templateUrl: './lsm.component.html',
  styleUrls: ['./lsm.component.scss']
})
export class LsmComponent {
  projectPage: ProjectFileModel = this.importService.getProjectPage('LSM')!;
  constructor(public importService: ImportService){
  }

  getCell(element: coreFeature, header: string) {
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

  displayedColumns: string[] = ['feature', 'syntax', 'explanation'];
  dataSource = this.projectPage.coreFeatures;
}


