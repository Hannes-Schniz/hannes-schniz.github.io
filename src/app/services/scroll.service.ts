import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {

    public scrollPosition: number = 0;

    position: number = 1;

    maxSteps: number = 2;

  constructor() { }

  public updateScrollPosition() {
    this.scrollPosition = this.getCurrentScrollPosition();
  }

  public getCurrentScrollPosition() {
    return ( 100 / window.innerHeight *  window.scrollY);
  }

  public scrollNext(){
    const nextPostion = this.position * document.body.offsetHeight;
    if(this.scrollPosition < this.getCurrentScrollPosition() ){
      if(nextPostion + document.body.offsetHeight < window.innerHeight){
        this.position++;
        if(this.position > this.maxSteps) {
          this.position = this.maxSteps;
        }
      }
      window.scrollTo(0, nextPostion);
      return;
    }
  }
}
