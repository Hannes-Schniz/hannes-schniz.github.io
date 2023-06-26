import { Component } from '@angular/core';
import { SlidesService } from '../services/slides.service';
import { slide } from '../models/slide';


//TODO add aniations
@Component({
  selector: 'app-slidepanel',
  templateUrl: './slidepanel.component.html',
  styleUrls: ['./slidepanel.component.scss'],
  animations: []
})
export class SlidepanelComponent {

  public currSlide: slide;

  public currImgURL: string = "";

  public currTitle: string = "";

  public progress: number = 0;

  public dots : Array<boolean> = [];

  constructor(public slideService: SlidesService) {
    this.currSlide = slideService.getInitSlide();
    this.initDots();
    this.update();
  }

  public nextSlide() {
    this.currSlide = this.slideService.getNextSlide();
    this.update();
  }

  public prevSlide() {
    this.currSlide = this.slideService.getPrevSlide();
    this.update();
  }

  private update() {
    this.currImgURL = this.currSlide.picture;
    this.currTitle = this.currSlide.title;
    this.progress = 100 / this.slideService.getNumberOfSlides() * (this.currSlide.position + 1);
    this.initDots();
  }

  private initDots() {
    this.dots = new Array<boolean>(this.slideService.getNumberOfSlides());
    for (let index = 0; index < this.slideService.getNumberOfSlides(); index++) {
      this.dots[index] = (index != this.currSlide.position);
    }
  }
}
