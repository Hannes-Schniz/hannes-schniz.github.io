import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ProjectFileModel } from '../../models/projectFile.model';
import { ImportService } from '../../services/import.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit{

  @Input() project!: string;


  projectPage!: ProjectFileModel;
  constructor(public importService: ImportService){
  }
  ngOnInit(): void {
    this.projectPage = this.importService.getProjectPage(this.project)!;
  }

}
