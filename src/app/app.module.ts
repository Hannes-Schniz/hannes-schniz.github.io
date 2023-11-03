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
import { MatListModule } from '@angular/material/list';
import { SlidepanelComponent } from './pages/home/slidepanel/slidepanel.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { HomeComponent } from './pages/home/home.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ContactFormHomeComponent } from './pages/home/contact-form-home/contact-form-home.component';
import { LsmComponent } from './pages/lsm/lsm.component';
import {MatTableModule} from '@angular/material/table';
import {MatChipsModule} from '@angular/material/chips';
import {MatDividerModule} from '@angular/material/divider';
import {MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { NextcloudComponent } from './pages/nextcloud/nextcloud.component';
import { RPIClockComponent } from './pages/rpiclock/rpiclock.component';
import { ScriptRunnerComponent } from './pages/script-runner/script-runner.component';
import { AboutMeComponent } from './pages/about-me/about-me.component';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTooltipModule} from '@angular/material/tooltip';
import { ImpressumPageComponent } from './pages/impressum-page/impressum-page.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { TableComponent } from './shared/components/table/table.component';
import { ProgressWheelComponent } from './shared/components/progress-wheel/progress-wheel.component';
import { FeatureListComponent } from './shared/components/feature-list/feature-list.component';
import { ProjectSummaryComponent } from './shared/components/project-summary/project-summary.component';
import { BannerComponent } from './shared/components/banner/banner.component';
import { ImageComponent } from './shared/components/image/image.component';
import { RoundPictureComponent } from './shared/components/round-picture/round-picture.component';
import { IntroTextComponent } from './shared/components/intro-text/intro-text.component';
import { RunaComponent } from './pages/runa/runa.component';
import { HangmanComponent } from './pages/hangman/hangman.component';
import { LinksComponent } from './shared/components/links/links.component';
import { ToolbarComponent } from './shared/components/toolbar/toolbar.component';

@NgModule({
  declarations: [
    AppComponent,
    SlidepanelComponent,
    HomeComponent,
    ContactFormHomeComponent,
    LsmComponent,
    NextcloudComponent,
    RPIClockComponent,
    ScriptRunnerComponent,
    AboutMeComponent,
    ImpressumPageComponent,
    FooterComponent,
    TableComponent,
    ProgressWheelComponent,
    FeatureListComponent,
    ProjectSummaryComponent,
    BannerComponent,
    ImageComponent,
    RoundPictureComponent,
    IntroTextComponent,
    RunaComponent,
    HangmanComponent,
    LinksComponent,
    ToolbarComponent
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
    MatProgressSpinnerModule,
    MatTableModule,
    MatChipsModule,
    MatDividerModule,
    MatInputModule,
    ReactiveFormsModule,
    ClipboardModule,
    MatSnackBarModule,
    MatTooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
