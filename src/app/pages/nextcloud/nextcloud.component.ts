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
  constructor(){
  }
}
