import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ImportService } from 'src/app/shared/services/import.service';
import { IsMobileService } from 'src/app/shared/services/is-mobile.service';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent {
  constructor(private _snackBar: MatSnackBar, public importService: ImportService, public screenSize: IsMobileService){}
  openSnackbar() {
    this._snackBar.open('Copied eMail', 'close')
  }

  hidden() {
    return IsMobileService.hidePanel();
  }
}
