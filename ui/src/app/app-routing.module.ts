import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { AuthGuard } from './guards/auth.guard';
import { LoanPageComponent } from './pages/loan-page/loan-page.component';
import { MyProfilePageComponent } from './pages/my-profile-page/my-profile-page.component';
import { MyResultPageComponent } from './pages/my-result-page/my-result-page.component';
import { EmploymentPageComponent } from './pages/employment-page/employment-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'chooseLoan', component: LoanPageComponent, canActivate: [AuthGuard] },
  { path: 'myProfile', component: MyProfilePageComponent, canActivate: [AuthGuard] },
  { path: 'myResult', component: MyResultPageComponent, canActivate: [AuthGuard] },
  { path: 'employment', component: EmploymentPageComponent, canActivate: [AuthGuard] },
  { path: '**', component: NotFoundPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
