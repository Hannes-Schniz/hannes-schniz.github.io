import { Component } from '@angular/core';
import { ScrollService } from '../../services/scroll.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  showChips: boolean = false;
  constructor(public scrollService: ScrollService){}

  toggle() {
    this.showChips = !this.showChips;
  }
}
