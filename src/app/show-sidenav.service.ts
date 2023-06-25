import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShowSidenavService {
  
  showSidenav: boolean;

  constructor() { 
    this.showSidenav = false;
  }

  toggleSidenav() {
    this.showSidenav = !this.showSidenav;
  }

  getShowSidenav() {
    return this.showSidenav;
  }
}
