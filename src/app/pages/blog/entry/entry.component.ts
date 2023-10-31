import { Component, Input } from '@angular/core';
import { BlogEntry } from 'src/app/shared/models/blogEntry.model';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})
export class EntryComponent {
  @Input() blogPost!: BlogEntry;

}
