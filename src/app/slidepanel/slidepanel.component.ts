import { Component } from '@angular/core';
import { SlidesService } from '../services/slides.service';
import { slide } from '../models/slide';

@Component({
  selector: 'app-slidepanel',
  templateUrl: './slidepanel.component.html',
  styleUrls: ['./slidepanel.component.scss']
})
export class SlidepanelComponent {

  public currSlide: slide;

  public currImgURL: string;

  constructor(public slideService: SlidesService) {
    this.currSlide = slideService.getInitSlide();
    this.currImgURL = this.currSlide.picture;
  }

  public nextSlide() {
    this.currSlide = this.slideService.getNextSlide();
    this.updateImg();
  }

  public prevSlide() {
    this.currSlide = this.slideService.getPrevSlide();
    this.updateImg();
  }

  private updateImg() {
    this.currImgURL = this.currSlide.picture;
  }
}
