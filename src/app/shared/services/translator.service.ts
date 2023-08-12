import { Injectable } from '@angular/core';
import projectJson from '../jsons/projects.json';
import { slide } from '../models/slide';
import { project } from '../models/project';
import { ProjectFileModel } from '../models/projectFile.model';

@Injectable({
  providedIn: 'root',
})
export class TranslatorService {
  private static allProjects: project[] = projectJson.projects;

  constructor() {
  }

  static getSlideObjects(): slide[] {
    let slides: Array<slide> = new Array<slide>(this.allProjects.length);

    for (let index = 0; index < this.allProjects.length; index++) {
      slides[index] = this.allProjects[index].slide;
    }
    return slides;
  }

  static getProjects(): project[] {
    return this.allProjects;
  }

  static getProjectPages(): ProjectFileModel[] {
    let projectPages: ProjectFileModel[] = [];
    for (const project of this.allProjects) {
      projectPages.push(project.projectPage);
    }
    return projectPages;
  }

  static getProjectPage(ID: string) {
    for (const project of this.allProjects) {
      if (project.ProjectID == ID) {
        return project.projectPage;
      }
    }
    return null;
  }

}
