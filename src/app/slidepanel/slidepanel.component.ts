import { Component } from '@angular/core';
import { SlidesService } from '../services/slides.service';
import { slide } from '../models/slide';
import { Observable, Subscription, interval } from 'rxjs';
import { trigger, transition, style, animate, group, state, query } from '@angular/animations';

'@angular/animations'
const left = [
  query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
  group([
    query(':enter', [style({ transform: 'translateX(-100%)' }), animate('.3s ease-out', style({ transform: 'translateX(0%)' }))], {
      optional: true,
    }),
    query(':leave', [style({ transform: 'translateX(0%)' }), animate('.3s ease-out', style({ transform: 'translateX(100%)' }))], {
      optional: true,
    }),
  ]),
];

const right = [
  query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
  group([
    query(':enter', [style({ transform: 'translateX(100%)' }), animate('.3s ease-out', style({ transform: 'translateX(0%)' }))], {
      optional: true,
    }),
    query(':leave', [style({ transform: 'translateX(0%)' }), animate('.3s ease-out', style({ transform: 'translateX(-100%)' }))], {
      optional: true,
    }),
  ]),
];

//TODO add aniations
@Component({
  selector: 'app-slidepanel',
  templateUrl: './slidepanel.component.html',
  styleUrls: ['./slidepanel.component.scss'],
  animations: [trigger('animImageSlider', [
    transition(':increment', right),
    transition(':decrement', left),
  ]),]
})
export class SlidepanelComponent {

  WAITINTERVAL = 10000;

  SLIDEINTERVAL = 7500;

  public currSlide: slide;

  public currImgURL: string = "";

  public currTitle: string = "";

  public dots : Array<boolean> = [];

  public position = 0;

  private subscription: Subscription;

  private source = interval(this.SLIDEINTERVAL);



  constructor(public slideService: SlidesService) {
    this.currSlide = slideService.getInitSlide();
    this.subscription = new Subscription;
    this.init();
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

  private init() {
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
