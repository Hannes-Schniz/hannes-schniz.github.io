import { Component } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search-window',
  templateUrl: './search-window.component.html',
  styleUrls: ['./search-window.component.scss']
})
export class SearchWindowComponent {

  searchTerm = "";

  constructor(public searchService: SearchService) { }

  search() {
    if (this.searchTerm === "") {
      this.searchService.toggleSearch();
      return;
    }
    console.log(this.searchTerm);
    console.log(this.searchService.search(this.searchTerm!));
  }

  enterSearch(event: KeyboardEvent) {
    if (event.key === "Enter") {
      this.search();
    }
  }

}
