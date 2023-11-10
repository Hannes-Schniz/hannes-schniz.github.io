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
    document.getElementById("searchWindow")?.classList.remove(this.showSearch);
    if (this.showSearch === "hidden") {
      this.showSearch = "visible";
      document.getElementById("searchInput")?.focus();
    }
    else {
      this.showSearch = "hidden";
    }
    document.getElementById("searchWindow")?.classList.add(this.showSearch);
  }

  disableSearch() {
    document.getElementById("searchWindow")?.classList.remove(this.showSearch);
    this.showSearch = "hidden";
    document.getElementById("searchWindow")?.classList.add(this.showSearch);
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
}
