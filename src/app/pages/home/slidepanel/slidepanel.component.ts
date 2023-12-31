import { Component, OnInit } from '@angular/core';
import { SlidesService } from '../../../shared/services/slides.service';
import { slide } from '../../../shared/models/slide';
import { Subscription, interval } from 'rxjs';
import { trigger, transition, style, animate, group, query } from '@angular/animations';
import { IsMobileService } from 'src/app/shared/services/is-mobile.service';

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
  query(':enter, :leave', style({ position: 'absolute', width: '100%' }), { optional: true }),
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
export class SlidepanelComponent implements OnInit{

  SLIDEINTERVAL = 7500;

  TIMEOUT = 1500;

  public currSlide: slide;

  public dots : Array<boolean> = [];

  private subscription: Subscription = new Subscription;

  private source;

  private wait;

  constructor(public slideService: SlidesService, public screenSize: IsMobileService) {
    this.currSlide = slideService.getInitSlide();
    this.source = interval(this.SLIDEINTERVAL);
    this.wait = interval(this.TIMEOUT);
    this.startInterval();
    this.initDots();
  }
  ngOnInit(): void {
    this.currSlide = this.slideService.getInitSlide();
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
    this.subscription = this.source.subscribe(() => {this.nextSlide(); this.initDots()});
  }

  private stopInterval() {
    this.subscription.unsubscribe();
    this.subscription = this.wait.subscribe(() => {this.startInterval});
  }

  getDot(input: boolean){
    if(input) {
      return '../../../../assets/Symbols/icons8-round-96.png';
    }
    return '../../../../assets/Symbols/icons8-round-96-disabled.png';
  }

  getTexts() {
    return this.slideService.updateSlidesAndReturnCurrent();
  }

  hidden() {
    return IsMobileService.hidePanel();
  }

  setSlide(index: number) {
    this.currSlide = this.slideService.getSlide(index);
    this.initDots();
  }
}
