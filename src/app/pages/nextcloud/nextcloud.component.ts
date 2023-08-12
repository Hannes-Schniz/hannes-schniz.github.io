import { Component } from '@angular/core';
import { coreFeature } from 'src/app/shared/models/projectCoreFeature.model';
import { ProjectFileModel } from 'src/app/shared/models/projectFile.model';
import { TranslatorService } from 'src/app/shared/services/translator.service';

@Component({
  selector: 'app-nextcloud',
  templateUrl: './nextcloud.component.html',
  styleUrls: ['./nextcloud.component.scss']
})
export class NextcloudComponent {
  projectPage: ProjectFileModel = TranslatorService.getProjectPage('Nextcloud')!;
  hasCoreFeatures: boolean= false;
  hasAddFeatures: boolean= false;
  constructor(){
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
