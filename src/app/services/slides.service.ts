import { Injectable } from '@angular/core';
import { slide } from '../models/slide';
import { TranslatorService } from './translator.service';

@Injectable({
  providedIn: 'root'
})
export class SlidesService {

  private slides: Array<slide>;

  private slidePosition = 0;

  constructor(private translationService: TranslatorService) { 
    this.slides = translationService.getSlideObjects(); 
  }

  public getInitSlide():slide{
    return this.slides[0];
  }

  public getNextSlide(): slide{
    if(this.slidePosition == this.slides.length - 1){
      this.slidePosition = 0;
    }
    else {
      this.slidePosition++;
    }
    return this.slides[this.slidePosition];
  }

  public getPrevSlide(): slide{
    this.slidePosition--;
    if(this.slidePosition == -1){
      this.slidePosition = this.slides.length - 1;
    }
    return this.slides[this.slidePosition];
  }

  public getNumberOfSlides(): number{
    return this.slides.length;
  }
}
