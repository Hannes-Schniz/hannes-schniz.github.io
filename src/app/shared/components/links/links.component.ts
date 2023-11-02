import { Component, Input } from '@angular/core';
import { ImportService } from '../../services/import.service';
import { slide } from '../../models/slide';

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss']
})
export class LinksComponent {

  @Input() slides!: slide[];

  constructor() { }

}
