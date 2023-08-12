import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-personal-home',
  templateUrl: './personal-home.component.html',
  styleUrls: ['./personal-home.component.scss'],
})
export class PersonalHomeComponent {

  constructor(private _snackBar: MatSnackBar){}
  openSnackbar() {
    this._snackBar.open('Copied eMail', 'close')
  }
}
