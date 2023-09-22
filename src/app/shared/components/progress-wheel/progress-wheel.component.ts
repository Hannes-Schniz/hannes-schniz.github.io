import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ProjectFileModel } from '../../models/projectFile.model';
import { ImportService } from '../../services/import.service';

@Component({
  selector: 'app-progress-wheel',
  templateUrl: './progress-wheel.component.html',
  styleUrls: ['./progress-wheel.component.scss']
})
export class ProgressWheelComponent implements OnInit{
  @Input() project!: string;


  projectPage!: ProjectFileModel;
  constructor(public importService: ImportService){
  }
  ngOnInit(): void {
    this.projectPage = this.importService.getProjectPage(this.project)!;
  }
}
