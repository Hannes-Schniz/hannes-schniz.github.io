import { Component } from '@angular/core';
import { localstorageHelper } from '../../../shared/helper/localstorage.helper';
import { TEST } from '../../../shared/constants/localstorage.constants';
import { LocalstorageModel } from '../../../shared/models/localstorage.model';

@Component({
  selector: 'app-personal-home',
  templateUrl: './personal-home.component.html',
  styleUrls: ['./personal-home.component.scss'],
})
export class PersonalHomeComponent {
  public storage: localstorageHelper;

  constructor() {
    this.storage = localstorageHelper.register(TEST);
  }

  localstorageADD() {
    this.storage.add(
      new LocalstorageModel('test', 'test'),
      new LocalstorageModel('test2', 'test2')
    );
  }
  localstorageFORCE() {
    this.storage.force(
      new LocalstorageModel('test', 'this is forced'),
      new LocalstorageModel('test2', 'thisisforced')
    );
  }
  localstorageUPDATE() {
    this.storage.update(
      new LocalstorageModel('test', 'this is updated'),
      new LocalstorageModel('test2', 'this is updated')
    );
  }
  localstorageDELETE() {
    this.storage.delete('test', 'test2');
  }
}
