import { Component, Input } from '@angular/core';
import { slide } from '../../models/slide';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss']
})
export class LinksComponent {

  @Input() slides!: slide[];

  @Input() drawer!: MatDrawer;

  constructor() { }

}
