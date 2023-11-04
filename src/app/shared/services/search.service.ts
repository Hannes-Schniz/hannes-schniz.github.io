import { Injectable } from '@angular/core';
import { project } from '../models/project';
import { ImportService } from './import.service';
import { SearchWindowComponent } from '../components/search-window/search-window.component';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  public showSearch = "hidden";

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

  showState() {
    return this.showSearch;
  }

  search(term:string): project[] {
    if (term.length <= 0) {
      return [];
    }
    var finds = [];
    switch (term[0]) {
      case "#":
        finds = this.searchTags(term.substring(1));
        break;
      case "=":
        finds = this.searchTerms(term.substring(1));
        break;
      default:
        finds = this.searchTitle(term);
        break;
    }
    return finds;
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
