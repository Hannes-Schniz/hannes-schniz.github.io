import { Component, Input } from '@angular/core';
import { project } from 'src/app/shared/models/project';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent {

  @Input() result!: project;
}
