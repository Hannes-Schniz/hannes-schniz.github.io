import { AfterViewInit, Component, HostListener, Input, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ScrollService } from './shared/services/scroll.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit{

  @ViewChild('sidenav') public sidenav!: MatSidenav;

  constructor(public scrollService: ScrollService){
  }


  ngAfterViewInit() {

  }
  scrollTop() {
    window.scrollTo(0,0);
  }

  @HostListener("window:scroll", []) onWindowScroll() {
    this.scrollService.updateScrollPosition();
  }
}