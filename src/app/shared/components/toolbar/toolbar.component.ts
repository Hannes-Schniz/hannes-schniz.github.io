import { Component, Input } from '@angular/core';
import { ImportService } from '../../services/import.service';
import { languages } from '../../constants/languages.constants';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  @Input() drawer!: MatDrawer;

  en = languages.EN;
  de = languages.DE;

  constructor(public importService: ImportService) { }

  languageSwitch(newLanguage: languages) {
    this.importService.switchLanguage(newLanguage);
  }

}
