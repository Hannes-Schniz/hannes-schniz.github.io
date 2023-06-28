import { Injectable } from '@angular/core';

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
    return ( 100 / ((this.numberElements - 1) * window.innerHeight) *  window.scrollY);
  }
}
