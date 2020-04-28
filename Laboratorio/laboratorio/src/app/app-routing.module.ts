import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './_components/start/login/login.component';
import { SignupComponent } from './_components/start/signup/signup.component';
import { ProjectListComponent } from './_components/project/project-list/project-list.component';
import { CanActivateRouteGuard } from './_guards/can-activate-route.guard';
import { PageNotFoundComponent } from './_components/page-not-found/page-not-found.component';
import { ResetComponent } from './_components/start/reset/reset.component';
import { LabComponent } from './_components/lab/lab.component';
import { ProjectItemComponent } from './_components/project/project-item/project-item.component';
import { ProjectDetailComponent } from './_components/project/project-detail/project-detail.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'reset', component: ResetComponent },
  { 
    path: 'lab', 
    component: LabComponent, 
    canActivate: [CanActivateRouteGuard], 
    children: [
      {path: 'projects', component: ProjectListComponent},
      {path: 'project/:id', component: ProjectItemComponent},
      {path: 'project/:id/:date', component: ProjectDetailComponent},
      {path: '', component: ProjectListComponent},
    ]
  },
  { path: '', component: LoginComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
