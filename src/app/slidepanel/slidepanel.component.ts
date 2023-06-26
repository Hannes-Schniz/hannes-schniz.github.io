import { Component } from '@angular/core';
import { SlidesService } from '../services/slides.service';
import { slide } from '../models/slide';

@Component({
  selector: 'app-slidepanel',
  templateUrl: './slidepanel.component.html',
  styleUrls: ['./slidepanel.component.scss'],
  animations: []
})
export class SlidepanelComponent {

  public currSlide: slide;

  public currImgURL: string;

  public currTitle: string;

  constructor(public slideService: SlidesService) {
    this.currSlide = slideService.getInitSlide();
    this.currImgURL = this.currSlide.picture;
    this.currTitle = this.currSlide.title;
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
  }
}
