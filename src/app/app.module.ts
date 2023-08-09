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
import { AppNavComponent } from './shared/components/app-nav/app-nav.component';
import { MatListModule } from '@angular/material/list';
import { SlidepanelComponent } from './pages/home/slidepanel/slidepanel.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { ProjectComponentComponent } from './pages/project-component/project-component.component';
import { HomeComponent } from './pages/home/home.component';
import {MatMenuModule} from '@angular/material/menu';
import { PersonalHomeComponent } from './pages/home/personal-home/personal-home.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ContactFormHomeComponent } from './pages/home/contact-form-home/contact-form-home.component';

@NgModule({
  declarations: [
    AppComponent,
    AppNavComponent,
    SlidepanelComponent,
    ProjectComponentComponent,
    HomeComponent,
    PersonalHomeComponent,
    ContactFormHomeComponent
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
    MatMenuModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
