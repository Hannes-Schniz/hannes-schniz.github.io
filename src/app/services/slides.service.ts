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
    let old = this.slidePosition;
    if(this.slidePosition == this.slides.length - 1){
      this.slidePosition = 0;
    }
    else {
      this.slidePosition++;
    }
    return this.slides[old];
  }

  public getPrevSlide(): slide{
    let old = this.slidePosition;
    if(this.slidePosition == 0){
      this.slidePosition = this.slides.length - 1;
    }
    else {
      this.slidePosition--;
    }
    return this.slides[old];
  }
}
