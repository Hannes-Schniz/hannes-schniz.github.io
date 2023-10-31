import { Component } from '@angular/core';
import { IsMobileService } from 'src/app/shared/services/is-mobile.service';

@Component({
  selector: 'app-runa',
  templateUrl: './runa.component.html',
  styleUrls: ['./runa.component.scss']
})
export class RunaComponent {

  project = 'RUNA';

  constructor(){
  }

  hidden() {
    return IsMobileService.hidePanel();
  }

}
