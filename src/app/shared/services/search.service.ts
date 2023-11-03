import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  public showSearch = false;

  constructor() { }

  toggleSearch() {
    this.showSearch = !this.showSearch;
  }

  showState() {
    return this.showSearch;
  }
}
