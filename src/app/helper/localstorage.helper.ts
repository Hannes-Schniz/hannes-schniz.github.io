import { LocalstorageModel } from "../models/localstorage.model";

export class localstorageHelper {

  private componentID: string = '';

  private localStorageImage: LocalstorageModel[] = [];

  static register(ComponentID: string) {
    return new localstorageHelper(ComponentID);
  }

  constructor(componentID: string) {
    this.componentID = componentID;
    this.localStorageImage = this.getAllEntries();
  }

  add(newEntry: LocalstorageModel) {
    this.localStorageImage.push(newEntry);
    this.sync();
  }

  getAllEntries() {
    if(localStorage.getItem(this.componentID) != null) {
      const entries: LocalstorageModel[] = JSON.parse((localStorage.getItem(this.componentID) || ''));
      return entries;
  }
  return [];
}
sync() {
  localStorage.setItem(this.componentID, JSON.stringify(this.localStorageImage));
}
}
