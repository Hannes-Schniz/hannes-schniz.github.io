import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { FormControl } from '@angular/forms';
import { project } from '../../models/project';
import { EXPSUMQUERY, EXPTAGQUERY, EXPTITLEQUERY, SUMQUERY, TAGQUERY, TITLEQUERY } from '../../constants/queries.constants';

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

  queryText = [TAGQUERY, EXPTAGQUERY, SUMQUERY, EXPSUMQUERY, TITLEQUERY, EXPTITLEQUERY];

  title = "Search Queries";

  subTitle = "Put the query at the start of your search term"

  constructor(public searchService: SearchService) { }
  focus() {
    document.getElementById('search-input')!.focus();
  }

  search() {

    this.results = this.searchService.search(this.searchTerm);
  }

  enterSearch(event: KeyboardEvent) {
    if (event.key === "Enter") {
      this.search();
    }
  }

  toggleHelp() {
    document.getElementById('help')!.classList.toggle('hidden');
  }

}
