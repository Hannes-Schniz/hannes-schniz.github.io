import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent {
  constructor(private _snackBar: MatSnackBar){}
  openSnackbar() {
    this._snackBar.open('Copied eMail', 'close')
  }
}
