import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ImportService } from '../../services/import.service';
import { IsMobileService } from '../../services/is-mobile.service';

@Component({
  selector: 'app-intro-text',
  templateUrl: './intro-text.component.html',
  styleUrls: ['./intro-text.component.scss']
})
export class IntroTextComponent {


  constructor(private _snackBar: MatSnackBar, public importService: ImportService, public screenSize: IsMobileService){}
  openSnackbar() {
    this._snackBar.open('Copied eMail', 'close')
  }

}
