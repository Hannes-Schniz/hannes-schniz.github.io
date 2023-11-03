import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-round-picture',
  templateUrl: './round-picture.component.html',
  styleUrls: ['./round-picture.component.scss']
})
export class RoundPictureComponent {

  @Input() src!: string;

}
