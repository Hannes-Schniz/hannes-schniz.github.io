import {  Component, HostListener} from '@angular/core';
import { ScrollService } from './shared/services/scroll.service';
import { ImportService } from './shared/services/import.service';
import { languages } from './shared/constants/languages.constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{

  constructor(public scrollService: ScrollService, public importService: ImportService){
  }

  scrollTop() {
    window.scrollTo(0,0);
  }

  @HostListener("window:scroll", []) onWindowScroll() {
    this.scrollService.updateScrollPosition();
  }

  @HostListener('window:keydown.control.alt.s', ['$event'])
  bigFont(event: KeyboardEvent) {
    event.preventDefault();

  }

}
