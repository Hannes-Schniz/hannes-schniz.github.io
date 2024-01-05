import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-commandline',
  templateUrl: './commandline.component.html',
  styleUrls: ['./commandline.component.scss']
})
export class CommandlineComponent {

  @Input() routerLink!: string;
  @Input() linkName!: string;


}
