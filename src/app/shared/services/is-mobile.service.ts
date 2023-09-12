import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IsMobileService {

  screenSizeCutoff = 500;

  constructor() { }

  hidePanel(){
    return document.body.clientWidth > this.screenSizeCutoff;
  }
}
