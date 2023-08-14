import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutMeComponent } from './pages/about-me/about-me.component';
import { HomeComponent } from './pages/home/home.component';
import { PersonalHomeComponent } from './pages/home/personal-home/personal-home.component';
import { ImpressumPageComponent } from './pages/impressum-page/impressum-page.component';
import { LsmComponent } from './pages/lsm/lsm.component';
import { NextcloudComponent } from './pages/nextcloud/nextcloud.component';
import { RPIClockComponent } from './pages/rpiclock/rpiclock.component';
import { ScriptRunnerComponent } from './pages/script-runner/script-runner.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'LSM', component: LsmComponent },
  { path: 'Nextcloud', component: NextcloudComponent },
  { path: 'RPI_Clock', component: RPIClockComponent },
  { path: 'ScriptRunner', component: ScriptRunnerComponent },
  { path: 'AboutMe', component: AboutMeComponent },
  { path: 'Impressum', component: ImpressumPageComponent },
{ path: '', redirectTo: '/home', pathMatch: 'full' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
