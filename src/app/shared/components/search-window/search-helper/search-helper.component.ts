import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-search-helper',
  templateUrl: './search-helper.component.html',
  styleUrls: ['./search-helper.component.scss']
})
export class SearchHelperComponent {

  @Input() texts!: String[];

  @Input() header!: String;

  @Input() subHeader!: String;

}
