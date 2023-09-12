import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IsMobileService {

  static screenSizeCutoff = 800;

  constructor() { }

  static hidePanel(){
    return document.body.clientWidth > this.screenSizeCutoff;
  }
}
