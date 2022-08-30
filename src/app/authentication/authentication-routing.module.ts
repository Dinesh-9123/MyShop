import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../guards/auth-guard.service';
import { VisitGuardService } from '../guards/visit-guard.service';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {path:'',component:LoginComponent, canActivate:[VisitGuardService]},
  {path:'login',component:LoginComponent, canActivate:[VisitGuardService]},
  {path:'signup',component:SignupComponent, canActivate:[VisitGuardService]}, 
  {path:'change-password',component:ChangePasswordComponent, canActivate:[AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
