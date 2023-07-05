import { Component } from '@angular/core';
import { SlidesService } from '../services/slides.service';
import { slide } from '../models/slide';
import { Subscription, interval } from 'rxjs';
import { trigger, transition, style, animate, group, query } from '@angular/animations';

'@angular/animations'
const left = [
  query(':enter, :leave', style({ position: 'absolute', width: '100%' }), { optional: true }),
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

  SLIDEINTERVAL = 7500;

  public currSlide: slide;

  public dots : Array<boolean> = [];

  private subscription: Subscription = new Subscription;

  private source;



  constructor(public slideService: SlidesService) {
    this.currSlide = slideService.getInitSlide();
    this.source = interval(this.SLIDEINTERVAL);
    this.startInterval();
    this.initDots();
  }

  ngOnDestroy() {
    this.stopInterval();
  }

  public navigated(next: boolean) {
    this.stopInterval();
    if(next) {
      this.nextSlide()
    }
    else {
      this.currSlide = this.slideService.getPrevSlide();
    }
    this.initDots();
  }

  private nextSlide() {
    this.currSlide = this.slideService.getNextSlide();
  }

  private initDots() {
    this.dots = new Array<boolean>(this.slideService.getNumberOfSlides());
    for (let index = 0; index < this.slideService.getNumberOfSlides(); index++) {
      this.dots[index] = (index != this.currSlide.position);
    }
  }

  private startInterval() {
    this.subscription = this.source.subscribe(() => this.nextSlide());
  }

  private stopInterval() {
    this.subscription.unsubscribe();
  }
}
