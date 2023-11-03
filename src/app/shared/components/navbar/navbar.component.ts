import { Component } from '@angular/core';
import { languages } from '../../constants/languages.constants';
import { ImportService } from '../../services/import.service';
import { ScrollService } from '../../services/scroll.service';
import { IsMobileService } from '../../services/is-mobile.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  showChips: boolean = false;

  public showDrawer = false;

  en = languages.EN;
  de = languages.DE;
  constructor(public scrollService: ScrollService, public importService: ImportService){}

  toggle() {
    //this.showChips = !this.showChips;
    //this.showDrawer = !this.showDrawer;
  }

  languageSwitch(newLanguage: languages) {
    this.importService.switchLanguage(newLanguage);
  }

}
