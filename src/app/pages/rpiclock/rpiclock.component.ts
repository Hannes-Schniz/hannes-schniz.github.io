import { Component } from '@angular/core';
import { ProjectFileModel } from 'src/app/shared/models/projectFile.model';
import { ImportService } from 'src/app/shared/services/import.service';

@Component({
  selector: 'app-rpiclock',
  templateUrl: './rpiclock.component.html',
  styleUrls: ['./rpiclock.component.scss']
})
export class RPIClockComponent {
  projectPage: ProjectFileModel = ImportService.getProjectPage('RPICLock')!;
  constructor(){
  }
}
