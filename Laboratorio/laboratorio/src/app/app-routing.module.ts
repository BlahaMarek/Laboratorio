import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './_components/start/login/login.component';
import { SignupComponent } from './_components/start/signup/signup.component';
import { ProjectListComponent } from './_components/project/project-list/project-list.component';
import { CanActivateRouteGuard } from './_guards/can-activate-route.guard';
import { PageNotFoundComponent } from './_components/page-not-found/page-not-found.component';
import { ResetComponent } from './_components/start/reset/reset.component';
import { LabComponent } from './_components/lab/lab.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'reset', component: ResetComponent },
  { path: 'lab', 
    component: LabComponent, 
    canActivate: [CanActivateRouteGuard], 
    children: [
      {path: '', component: ProjectListComponent},
      {path: 'projects', component: ProjectListComponent},
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
