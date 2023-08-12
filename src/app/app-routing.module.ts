import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LsmComponent } from './pages/lsm/lsm.component';
import { NextcloudComponent } from './pages/nextcloud/nextcloud.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'LSM', component: LsmComponent },
  { path: 'Nextcloud', component: NextcloudComponent },
{ path: '', redirectTo: '/home', pathMatch: 'full' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
