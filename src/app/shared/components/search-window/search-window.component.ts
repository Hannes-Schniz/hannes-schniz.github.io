import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { FormControl } from '@angular/forms';
import { project } from '../../models/project';

@Component({
  selector: 'app-search-window',
  templateUrl: './search-window.component.html',
  styleUrls: ['./search-window.component.scss']
})
export class SearchWindowComponent {
  static focus() {
    throw new Error('Method not implemented.');
  }

  searchTerm = "";

  results: project[] = [];

  constructor(public searchService: SearchService) { }
  focus() {
    document.getElementById('search-input')!.focus();
  }

  search() {
    if (this.searchTerm === "") {
      this.searchService.toggleSearch();
      return;
    }
    this.results = this.searchService.search(this.searchTerm);
  }

  enterSearch(event: KeyboardEvent) {
    if (event.key === "Enter") {
      this.search();
    }
  }

}
