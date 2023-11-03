import { AfterViewInit, Component, Input } from '@angular/core';
import { ProjectFileModel } from '../../models/projectFile.model';
import { ImportService } from '../../services/import.service';

@Component({
  selector: 'app-feature-list',
  templateUrl: './feature-list.component.html',
  styleUrls: ['./feature-list.component.scss']
})
export class FeatureListComponent implements AfterViewInit{

  @Input() project!: string;


  projectPage!: ProjectFileModel;
  constructor(public importService: ImportService){
  }
  ngAfterViewInit(): void {
    console.log(this.project);
    this.projectPage = this.importService.getProjectPage(this.project)!;
    console.log(this.projectPage);
  }

  getTexts() {
    return this.importService.getProjectPage(this.project)!;
  }

}
