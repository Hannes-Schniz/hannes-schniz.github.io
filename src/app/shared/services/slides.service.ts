import { Injectable } from '@angular/core';
import { slide } from '../models/slide';
import { ImportService } from './import.service';

@Injectable({
  providedIn: 'root'
})
export class SlidesService {

  private slides: Array<slide>;

  public slidePosition = 0;

  constructor(public importService: ImportService) {
    this.slides = importService.getSlideObjects();
  }

  public getInitSlide():slide{
    return this.slides[0];
  }

  public getNextSlide(): slide{
    this.slides = this.importService.getSlideObjects();
    if(this.slidePosition == this.slides.length - 1){
      this.slidePosition = 0;
    }
    else {
      this.slidePosition++;
    }
    return this.slides[this.slidePosition];
  }

  public getPrevSlide(): slide{
    this.slides = this.importService.getSlideObjects();
    this.slidePosition--;
    if(this.slidePosition == -1){
      this.slidePosition = this.slides.length - 1;
    }
    return this.slides[this.slidePosition];
  }

  public getNumberOfSlides(): number{
    return this.slides.length;
  }

  public getSlides() {
    this.slides = this.importService.getSlideObjects();
    return this.slides;
  }

  public updateSlidesAndReturnCurrent() {
    this.slides = this.importService.getSlideObjects();
    return this.slides[this.slidePosition];  }
}
