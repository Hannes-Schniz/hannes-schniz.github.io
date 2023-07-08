import { LocalstorageModel } from '../models/localstorage.model';

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

  add(...newEntry: LocalstorageModel[]) {
    for (let index = 0; index < newEntry.length; index++) {
      if (this.hasKey(newEntry[index].key) >= 0 ) {
        return false;
      }
    }
    for (let index = 0; index < newEntry.length; index++) {
      this.localStorageImage.push(newEntry[index]);
    }
    this.sync();
    return true;
  }

  force(...newEntry: LocalstorageModel[]) {
    for (let index = 0; index < newEntry.length; index++) {
      this.localStorageImage.push(newEntry[index]);
    }
    this.sync();
  }

  update(...newEntry: LocalstorageModel[]) {
    for (let index = 0; index < newEntry.length; index++) {
      if (this.hasKey(newEntry[index].key) == -1) {
        return false;
      }
    }
    for (let index = 0; index < newEntry.length; index++) {
      this.localStorageImage[this.hasKey(newEntry[index].key)].value = newEntry[index].value;
    }
    this.sync();
    return true;
  }

  delete(...key: string[]) {
    for (let index = 0; index < key.length; index++) {
      if (this.hasKey(key[index]) == -1) {
        return false;
      }
    }
    for (let index = 0; index < key.length; index++) {
      this.localStorageImage = this.localStorageImage.splice(this.hasKey(key[index]), 1);
      if(this.localStorageImage.length == 1 && this.localStorageImage[0].key == key[index]){
        this.localStorageImage = [];
      }
    }
    this.sync();
    return true;
  }

  getAllEntries() {
    if (localStorage.getItem(this.componentID) != null) {
      const entries: LocalstorageModel[] = JSON.parse(
        localStorage.getItem(this.componentID) || ''
      );
      return entries;
    }
    return [];
  }

  private sync() {
    localStorage.setItem(
      this.componentID,
      JSON.stringify(this.localStorageImage)
    );
  }

  private hasKey(key: string) {
    for (let index = 0; index < this.localStorageImage.length; index++) {
      if (this.localStorageImage[index].key == key) {
        return index;
      }
    }
    return -1;
  }
}
