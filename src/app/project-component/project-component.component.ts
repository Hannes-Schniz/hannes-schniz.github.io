import { Component } from '@angular/core';
import { TranslatorService } from '../services/translator.service';
import { project } from '../models/project';

@Component({
  selector: 'app-project-component',
  templateUrl: './project-component.component.html',
  styleUrls: ['./project-component.component.scss']
})
export class ProjectComponentComponent {

  public projects: project[];

  constructor(public translator: TranslatorService) {
    this.projects = translator.getProjects();
  }
}
