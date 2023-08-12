import { Component } from '@angular/core';
import { ProjectFileModel } from 'src/app/shared/models/projectFile.model';
import { TranslatorService } from 'src/app/shared/services/translator.service';

@Component({
  selector: 'app-rpiclock',
  templateUrl: './rpiclock.component.html',
  styleUrls: ['./rpiclock.component.scss']
})
export class RPIClockComponent {
  projectPage: ProjectFileModel = TranslatorService.getProjectPage('Nextcloud')!;
  constructor(){
  }
}
