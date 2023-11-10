import { Injectable } from '@angular/core';
import projectENJson from '../jsons/projects-EN.json';
import projectDEJson from '../jsons/projects-DE.json';
import textsENJSON from '../jsons/texts-EN.json';
import textsDEJSON from '../jsons/texts-DE.json';
import personalENJSON from '../jsons/personal-EN.json';
import personalDEJSON from '../jsons/personal-DE.json';
import { slide } from '../models/slide';
import { project } from '../models/project';
import { ProjectFileModel } from '../models/projectFile.model';
import { defaultLanguage, languages } from '../constants/languages.constants';

@Injectable({
  providedIn: 'root',
})
export class ImportService {
  private currentProjects = projectENJson.projects;
  private allProjectsEN: project[] = projectENJson.projects;
  private allProjectsDE: project[] = projectDEJson.projects;

  currentLanguage = this.load();


  constructor() {
    this.selectLanguage();
  }

  getSlideObjects(): slide[] {
    let slides: Array<slide> = new Array<slide>(this.currentProjects.length);

    for (let index = 0; index < this.currentProjects.length; index++) {
      slides[index] = this.currentProjects[index].slide;
    }
    return slides;
  }

  getProjects(): project[] {
    return this.currentProjects;
  }

  getOtherLanguageProjects(): project[] {
    if (this.currentLanguage == languages.DE) {
      return this.allProjectsEN;
    }
    return this.allProjectsDE;
  }


  getProjectPages(): ProjectFileModel[] {
    let projectPages: ProjectFileModel[] = [];
    for (const project of this.currentProjects) {
      projectPages.push(project.projectPage);
    }
    return projectPages;
  }

    getProjectPage(ID: string) {
    for (const project of this.currentProjects) {
      if (project.ProjectID == ID) {
        return project.projectPage;
      }
    }
    return null;
  }

  selectLanguage(){
    switch (this.getLanguage()) {
      case languages.EN:
        this.currentProjects = this.allProjectsEN;
        break;
      case languages.DE:
        this.currentProjects = this.allProjectsDE;
        break;
      default:
        this.currentProjects = this.allProjectsEN;
        break;
    }
  }

  switchLanguage(newLanguage: languages) {
    let reload = !(this.currentLanguage == newLanguage);
    this.currentLanguage = newLanguage;
    this.store();
    this.selectLanguage();
    if(reload) {
      //window.location.reload();
    }
  }

  store() {
    localStorage.setItem('language', JSON.stringify(this.currentLanguage));
  }

  getLanguage() {
    this.load();
    return this.currentLanguage;
  }

  load() {
    let store = localStorage.getItem('language');
    if(store == null) {
      return defaultLanguage;
    }
    return JSON.parse(store);
  }

  getTexts() {
    if (this.currentLanguage == languages.DE) {
      return textsDEJSON;
    }
    return textsENJSON;
  }

  getPersonal() {
    if (this.currentLanguage == languages.DE) {
      return personalDEJSON;
    }
    return personalENJSON;
  }

}
