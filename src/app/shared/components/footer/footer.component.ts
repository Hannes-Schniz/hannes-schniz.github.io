import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  constructor(private _snackBar: MatSnackBar){}
  openSnackbar() {
    this._snackBar.open('Copied eMail', 'close')
  }
}
