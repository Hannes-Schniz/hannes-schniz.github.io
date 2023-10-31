import { Summary } from "./projectSummary.model";

export class BlogEntry {
  constructor(public id: number, public body: Summary, public picture: string, public sidePicture:string, public date:string){}
}
