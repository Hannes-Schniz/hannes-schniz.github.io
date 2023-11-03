import { Component } from '@angular/core';
import { IsMobileService } from 'src/app/shared/services/is-mobile.service';

@Component({
  selector: 'app-script-runner',
  templateUrl: './script-runner.component.html',
  styleUrls: ['./script-runner.component.scss']
})
export class ScriptRunnerComponent {

  project = 'Script_Runner';
  constructor(public screenSize: IsMobileService){
  }

  hidden() {
    return IsMobileService.hidePanel();
  }

}
