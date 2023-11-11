import { Component } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { project } from '../../models/project';
import { EXACTCOMPLETIONQUERY, EXPEXACTCOMPLETIONQUERY, EXPGREATERCOMPLETIONQUERY, EXPSMALLERCOMPLETIONQUERY, EXPSUMQUERY, EXPTAGQUERY, EXPTITLEQUERY, GREATERCOMPLETIONQUERY, SMALLERCOMPLETIONQUERY, SUMQUERY, TAGQUERY, TITLEQUERY } from '../../constants/queries.constants';

@Component({
  selector: 'app-search-window',
  templateUrl: './search-window.component.html',
  styleUrls: ['./search-window.component.scss']
})
export class SearchWindowComponent {
  static focus() {
    throw new Error('Method not implemented.');
  }
  results: project[] = [];

  queryText = [TAGQUERY, EXPTAGQUERY, SUMQUERY, EXPSUMQUERY, GREATERCOMPLETIONQUERY, EXPGREATERCOMPLETIONQUERY ,EXACTCOMPLETIONQUERY, EXPEXACTCOMPLETIONQUERY, SMALLERCOMPLETIONQUERY, EXPSMALLERCOMPLETIONQUERY, TITLEQUERY, EXPTITLEQUERY ];

  title = "Search Queries";

  subTitle = "Put the query at the start of your search term"

  constructor(public searchService: SearchService) { }
  focus() {
    document.getElementById('search-input')!.focus();
  }

  search() {
    this.searchService.search();
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
