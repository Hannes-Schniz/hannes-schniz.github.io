import { Injectable } from '@angular/core';
import projectJson from "../jsons/projects.json"
import { slide } from '../models/slide';
import { project } from '../models/project';

@Injectable({
  providedIn: 'root'
})
export class TranslatorService {

  private allProjects: project[];

  constructor() {
    this.allProjects = projectJson.projects;
  }

  public getSlideObjects(): slide[] {

    let slides: Array<slide> = new Array<slide>(this.allProjects.length);

    for (let index = 0; index < this.allProjects.length; index++) {
      slides[index] = this.allProjects[index].slide

    }
    return slides;
  }

  public getProjects(): project[] {
    return this.allProjects;
  }
}
