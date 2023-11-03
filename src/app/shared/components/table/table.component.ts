import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { coreFeature } from '../../models/projectCoreFeature.model';
import { ProjectFileModel } from '../../models/projectFile.model';
import { ImportService } from '../../services/import.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements AfterViewInit{

  @Input() project!: string;


  projectPage!: ProjectFileModel;
  constructor(public importService: ImportService){
  }
  ngAfterViewInit(): void {
    console.log(this.project);
    this.projectPage = this.importService.getProjectPage(this.project)!;
    console.log(this.projectPage);
    this.dataSource = this.projectPage.coreFeatures;
  }
  getCell(element: coreFeature, header: string) {
    this.projectPage = this.importService.getProjectPage(this.project)!;
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
  dataSource: coreFeature[] = [];

}
