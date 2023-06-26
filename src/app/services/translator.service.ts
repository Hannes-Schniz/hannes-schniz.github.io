import { Injectable } from '@angular/core';
import slidesJson from "../jsons/slides.json"
import { slide } from '../models/slide';

@Injectable({
  providedIn: 'root'
})
export class TranslatorService {

  constructor() { }

  public getSlideObjects(): slide[] {
    return slidesJson.slides;
  }
}
