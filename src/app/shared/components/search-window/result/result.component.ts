import { Component, Input } from '@angular/core';
import { project } from 'src/app/shared/models/project';
import { SearchService } from 'src/app/shared/services/search.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent {

  @Input() results!: project[];

  constructor(public searchService: SearchService) {}
}
