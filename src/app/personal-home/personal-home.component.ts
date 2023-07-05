import { Component } from '@angular/core';

@Component({
  selector: 'app-personal-home',
  templateUrl: './personal-home.component.html',
  styleUrls: ['./personal-home.component.scss']
})
export class PersonalHomeComponent {

  constructor() {
    this.init();
  }

  init() {
    var fileURL = "../../assets/pdfs/Lebenslauf.pdf";
    console.log('test');
    console.log(document.querySelector('#pdf'), 'test');
    if(document.querySelector('#pdf') != null) {
      document.querySelector('#pdf')!.textContent = fileURL;
    }
  }
}
