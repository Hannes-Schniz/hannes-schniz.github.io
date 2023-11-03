import { AfterViewInit, Component, HostListener, Input, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ScrollService } from './shared/services/scroll.service';
import { languages } from './shared/constants/languages.constants';
import { ImportService } from './shared/services/import.service';

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



}
