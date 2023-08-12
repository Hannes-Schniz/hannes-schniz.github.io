import { additionalFeature } from "./projectAddFeature.model";
import { coreFeature } from "./projectCoreFeature.model";
import { Summary } from "./projectSummary.model";

export class ProjectFileModel {
  constructor(public title: string,
    public picture: string,
    public summary: Summary,
    public coreFeatures: coreFeature[],
    public additionalFeatures: additionalFeature[],
    public progress: number,
    public additionalPictures: string[],
    public gitLink: string){}
}
