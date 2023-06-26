import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectComponentComponent } from './project-component/project-component.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'projects', component: ProjectComponentComponent },
  { path: 'home', component: HomeComponent },
{ path: '', redirectTo: '/home', pathMatch: 'full' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
