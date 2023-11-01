import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BlogTitle } from 'src/app/shared/models/blogTitle.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() blogTitle!: BlogTitle;

  constructor(private _snackBar: MatSnackBar){}
  openSnackbar() {
    this._snackBar.open('Copied eMail', 'close')
  }
}
