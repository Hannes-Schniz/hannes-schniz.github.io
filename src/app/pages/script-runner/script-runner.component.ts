import { Component } from '@angular/core';
import { coreFeature } from 'src/app/shared/models/projectCoreFeature.model';
import { ProjectFileModel } from 'src/app/shared/models/projectFile.model';
import { ImportService } from 'src/app/shared/services/import.service';

@Component({
  selector: 'app-script-runner',
  templateUrl: './script-runner.component.html',
  styleUrls: ['./script-runner.component.scss']
})
export class ScriptRunnerComponent {
  projectPage: ProjectFileModel = this.importService.getProjectPage('Script_Runner')!;
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
