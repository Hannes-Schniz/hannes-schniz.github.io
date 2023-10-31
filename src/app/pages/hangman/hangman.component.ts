import { Component } from '@angular/core';
import { IsMobileService } from 'src/app/shared/services/is-mobile.service';

@Component({
  selector: 'app-hangman',
  templateUrl: './hangman.component.html',
  styleUrls: ['./hangman.component.scss']
})
export class HangmanComponent {

  project = 'HANGMAN';

  constructor(){
  }

  hidden() {
    return IsMobileService.hidePanel();
  }
}
