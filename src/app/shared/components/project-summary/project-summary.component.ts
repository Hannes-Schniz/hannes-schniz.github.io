import { Component, Input, OnInit } from '@angular/core';
import { ImportService } from '../../services/import.service';
import { ProjectFileModel } from '../../models/projectFile.model';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-project-summary',
  templateUrl: './project-summary.component.html',
  styleUrls: ['./project-summary.component.scss']
})
export class ProjectSummaryComponent implements OnInit{

  @Input() project!: string;


  projectPage!: ProjectFileModel;
  constructor(public importService: ImportService, public searchService: SearchService){
  }
  ngOnInit(): void {
    this.projectPage = this.importService.getProjectPage(this.project)!;
  }

  getTexts() {
    return this.importService.getProjectPage(this.project)!;
  }

  perfSearch(tag: string) {
    this.searchService.toggleSearch();
    this.searchService.searchTerm = '#' + tag;
    this.searchService.search();
  }

}
