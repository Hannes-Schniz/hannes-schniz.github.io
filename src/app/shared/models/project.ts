import { projectPageModel } from "./projectFile.model";
import { slide } from "./slide";

export class project{
  constructor(public slide:slide, public projectPage:projectPageModel){}
}
