import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ImportService } from 'src/app/shared/services/import.service';
import { IsMobileService } from 'src/app/shared/services/is-mobile.service';

@Component({
  selector: 'app-personal-home',
  templateUrl: './personal-home.component.html',
  styleUrls: ['./personal-home.component.scss'],
})
export class PersonalHomeComponent {

  constructor(private _snackBar: MatSnackBar, public importService: ImportService, public screenSize: IsMobileService){}
  openSnackbar() {
    this._snackBar.open('Copied eMail', 'close')
  }
}
