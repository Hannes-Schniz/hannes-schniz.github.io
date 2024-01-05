import { Component, Input } from '@angular/core';
import { ProjectFileModel } from '../../models/projectFile.model';
import { ImportService } from '../../services/import.service';
import { coreFeature } from '../../models/projectCoreFeature.model';

@Component({
  selector: 'app-corefeatures',
  templateUrl: './corefeatures.component.html',
  styleUrls: ['./corefeatures.component.scss']
})
export class CorefeaturesComponent {

  @Input() project!: string;


  projectPage!: ProjectFileModel;
  constructor(public importService: ImportService){
  }
  ngOnInit(): void {
    this.projectPage = this.importService.getProjectPage(this.project)!;
  }



}
