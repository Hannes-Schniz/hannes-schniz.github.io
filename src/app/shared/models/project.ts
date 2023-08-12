import { ProjectFileModel } from "./projectFile.model";
import { slide } from "./slide";

export class project{
  constructor(public ProjectID:string,public slide:slide, public projectPage:ProjectFileModel){}
}
