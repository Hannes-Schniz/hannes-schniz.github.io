import { Component } from '@angular/core';
import { SlidesService } from '../services/slides.service';
import { slide } from '../models/slide';
import { Observable, Subscription, interval } from 'rxjs';


//TODO add aniations
@Component({
  selector: 'app-slidepanel',
  templateUrl: './slidepanel.component.html',
  styleUrls: ['./slidepanel.component.scss'],
  animations: []
})
export class SlidepanelComponent {

  WAITINTERVAL = 10000;

  SLIDEINTERVAL = 7500;

  public currSlide: slide;

  public currImgURL: string = "";

  public currTitle: string = "";

  public dots : Array<boolean> = [];

  private slideSpeed: number = 100;

  private subscription: Subscription;

  private source = interval(this.SLIDEINTERVAL);



  constructor(public slideService: SlidesService) {
    this.currSlide = slideService.getInitSlide();
    this.subscription = new Subscription;
    this.initDots();
    this.update();
    this.startInterval();
  }

  ngOnDestroy() {
    this.stopInterval();
  }

  public navigated(next: boolean) {
    this.stopInterval();
    if(next) {
      this.nextSlide();
      return;
    }
    this.prevSlide();
  }

  private nextSlide() {
    this.currSlide = this.slideService.getNextSlide();
    this.update();

  }

  private prevSlide() {
    this.currSlide = this.slideService.getPrevSlide();
    this.update();
  }

  private update() {
    this.currImgURL = this.currSlide.picture;
    this.currTitle = this.currSlide.title;
    this.initDots();
  }

  private initDots() {
    this.dots = new Array<boolean>(this.slideService.getNumberOfSlides());
    for (let index = 0; index < this.slideService.getNumberOfSlides(); index++) {
      this.dots[index] = (index != this.currSlide.position);
    }
  }

  private startInterval() {
    this.source = interval(this.SLIDEINTERVAL);
    this.subscription = this.source.subscribe(val => this.nextSlide());
  }

  private stopInterval() {
    this.subscription.unsubscribe();
  }

  private timeout() {
    this.source = interval(this.WAITINTERVAL);
    this.subscription = this.source.subscribe(val => this.startInterval());
  }
}
