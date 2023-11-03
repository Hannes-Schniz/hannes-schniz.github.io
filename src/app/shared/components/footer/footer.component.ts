import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IsMobileService } from '../../services/is-mobile.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  constructor(private _snackBar: MatSnackBar, public screenSize: IsMobileService){}
  openSnackbar() {
    this._snackBar.open('Copied eMail', 'close')
  }

  showPanel() {
    return window.location.href.match('.*home')?.length == undefined;
  }
}
