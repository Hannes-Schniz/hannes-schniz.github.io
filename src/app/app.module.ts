import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatCardModule} from '@angular/material/card';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { AppNavComponent } from './app-nav/app-nav.component';
import { MatListModule } from '@angular/material/list';
import { SlidepanelComponent } from './slidepanel/slidepanel.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { ProjectComponentComponent } from './project-component/project-component.component';
import { HomeComponent } from './home/home.component';
import {MatMenuModule} from '@angular/material/menu';
import { PersonalHomeComponent } from './personal-home/personal-home.component';

@NgModule({
  declarations: [
    AppComponent,
    AppNavComponent,
    SlidepanelComponent,
    ProjectComponentComponent,
    HomeComponent,
    PersonalHomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatCardModule,
    MatSidenavModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatProgressBarModule,
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
