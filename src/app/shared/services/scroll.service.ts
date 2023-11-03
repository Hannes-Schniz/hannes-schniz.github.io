import { Injectable, ɵɵresolveBody } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {

  public barPosition: number = 0;

  numberElements: number = 3;

  private DISPLAYPERCENT = 50;



  constructor() { }

  public updateScrollPosition() {
    this.barPosition = Math.floor(this.getCurrentScrollPosition());
  }

  public getCurrentScrollPosition() {
    //return Math.floor(100 / window.innerHeight * window.scrollY);
    return 100;
  }

  public showScrollTop() {
    //return this.getCurrentScrollPosition() > 30;
    return Math.floor(100 / window.innerHeight * window.scrollY) > this.DISPLAYPERCENT;
  }
}
