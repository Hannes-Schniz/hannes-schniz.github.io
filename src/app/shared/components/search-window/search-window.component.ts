import { Component } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search-window',
  templateUrl: './search-window.component.html',
  styleUrls: ['./search-window.component.scss']
})
export class SearchWindowComponent {

  searchTerm = new FormControl('');

  constructor(public searchService: SearchService) { }

  search() {
    console.log(this.searchTerm.value);
    console.log(this.searchService.search(this.searchTerm.value!));
  }

}
