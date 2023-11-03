import { Injectable } from '@angular/core';
import { project } from '../models/project';
import { ImportService } from './import.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  public showSearch = false;

  constructor(private importService: ImportService) { }

  toggleSearch() {
    this.showSearch = !this.showSearch;
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
        finds = this.searchAuthors(term.substring(1));
        break;
      default:
        finds = this.searchTitle(term);
        break;
    }
  }

  private searchTags(term: string): project[] {
    var finds = [];
    for (const project of this.currentProjects) {
      for (const tag of project.tags) {
        if (tag.toLowerCase().includes(term.toLowerCase())) {
          finds.push(project);
          break;
        }
      }
    }
    return finds;
  }
}
