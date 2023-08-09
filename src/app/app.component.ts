import { Component, HostListener, Input, ViewChild } from '@angular/core';
import { ScrollService } from './shared/services/scroll.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public scrollService: ScrollService){}

  scrollTop() {
    window.scrollTo(0,0);
  }
}
