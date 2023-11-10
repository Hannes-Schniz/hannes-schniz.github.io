import { Injectable } from '@angular/core';
import { project } from '../models/project';
import { ImportService } from './import.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  public showSearch = "hidden";

  public searchTerm = "";

  public results: project[] = [];

  constructor(private importService: ImportService) { }

  toggleSearch() {
    if (this.showSearch === "hidden") {
      this.displaySearch();
    }
    else {
      this.disableSearch();
    }
  }

  displaySearch() {
      document.getElementById("searchWindow")?.classList.remove(this.showSearch);
      this.showSearch = "visible";
      document.getElementById("searchWindow")?.classList.add(this.showSearch);
      document.getElementById("searchInput")?.focus();
  }

  disableSearch() {
    document.getElementById("searchWindow")?.classList.remove(this.showSearch);
    this.showSearch = "hidden";
    document.getElementById("searchWindow")?.classList.add(this.showSearch);
  }

  tagSearch(tag: string) {
    if(this.showSearch === "hidden") {
      this.displaySearch();
    }
    this.searchTerm = '#' + tag;
    this.search();
    document.getElementById("colCenter")!.scrollTop = 0;
  }

  showState() {
    return this.showSearch;
  }

  search() {
    var finds = [];
    switch (this.searchTerm[0]) {
      case "#":
        finds = this.searchTags(this.searchTerm.substring(1));
        break;
      case "=":
        finds = this.searchTerms(this.searchTerm.substring(1));
        break;
      case "%":
        finds = this.searchPercent(this.searchTerm.substring(1));
        break;
      default:
        finds = this.searchTitle(this.searchTerm);
    }
    this.results = finds;
  }

  getTags (): string[] {
    var tags: string[] = [];
    for (const project of this.importService.getProjects()) {
      for (const tag of project.projectPage.summary.tags) {
        if (!tags.includes(tag)) {
          tags.push(tag);
        }
      }
    }
    return tags;
  }

  private searchTags(term: string): project[] {
    var finds = [];
    for (const project of this.importService.getProjects()) {
      for (const tag of project.projectPage.summary.tags) {
        if (tag.toLowerCase().includes(term.toLowerCase())) {
          finds.push(project);
          break;
        }
      }
    }
    return finds;
  }

  private searchTerms(term: string): project[] {
    var finds = [];
    for (const project of this.importService.getProjects()) {
      for (const text of project.projectPage.summary.text) {
        if (text.toLowerCase().includes(term.toLowerCase())) {
          finds.push(project);
          break;
        }
      }
    }
    return finds;
  }

  private searchTitle(term: string): project[] {
    var finds = [];
    for (const project of this.importService.getProjects()) {
      if (project.projectPage.summary.title.toLowerCase().includes(term.toLowerCase())) {
        finds.push(project);
      }
    }
    return finds;
  }

  private searchPercent(term: string): project[] {
    var finds: project[] = [];
    switch (term[0]) {
      case ">": {
        for (const project of this.importService.getProjects()) {
          if (project.projectPage.progress >= parseInt(term.substring(1))) {
            finds.push(project);
          }
        }
        break;
      }
      case "<": {
        for (const project of this.importService.getProjects()) {
          if (project.projectPage.progress <= parseInt(term.substring(1))) {
            finds.push(project);
          }
        }
        break;
      }
      default: {
        for (const project of this.importService.getProjects()) {
          if (project.projectPage.progress == parseInt(term.substring(1))) {
            finds.push(project);
          }
        }
      }
    }
    return finds;
  }
}
