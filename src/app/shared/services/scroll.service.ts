import { Injectable, ɵɵresolveBody } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {

  public barPosition: number = 0;

  numberElements: number = 3;



  constructor() { }

  public updateScrollPosition() {
    this.barPosition = Math.floor(this.getCurrentScrollPosition());
  }

  public getCurrentScrollPosition() {
    return ( 100 / (document.body.clientHeight - window.innerHeight ) * window.scrollY);
  }

  public showScrollTop() {
    return this.getCurrentScrollPosition() > 30;
  }
}
