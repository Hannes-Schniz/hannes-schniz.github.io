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
    var limit = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    return Math.floor(100 / limit * window.scrollY);
  }

  public showScrollTop() {
    return Math.floor(100 / window.innerHeight * window.scrollY) > this.DISPLAYPERCENT;
  }
}
