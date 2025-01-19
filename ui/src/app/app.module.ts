import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';

import { UserService } from './services/user.service';
import { AuthenticationService } from './services/authentication.service';
import { AuthGuard } from './guards/auth.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { LoanPageComponent } from './pages/loan-page/loan-page.component';
import { HeaderComponent } from './components/header/header.component';
import { PageContainerComponent } from './components/page-container/page-container.component';
import { MyProfilePageComponent } from './pages/my-profile-page/my-profile-page.component';
import { MyResultPageComponent } from './pages/my-result-page/my-result-page.component';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';
import { LoanListItemComponent } from './components/loan-list-item/loan-list-item.component';
import { LoanFormComponent } from './components/loan-form/loan-form.component';
import { LoaderComponent } from './components/loader/loader.component';
import { ResultListItemComponent } from './components/result-list-item/result-list-item.component';
import { EmploymentPageComponent } from './pages/employment-page/employment-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    NotFoundPageComponent,
    RegisterPageComponent,
    LoanPageComponent,
    HeaderComponent,
    PageContainerComponent,
    MyProfilePageComponent,
    MyResultPageComponent,
    DeleteDialogComponent,
    LoanListItemComponent,
    LoanFormComponent,
    LoaderComponent,
    ResultListItemComponent,
    EmploymentPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    BsDatepickerModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [provideHttpClient(), UserService, AuthenticationService, AuthGuard, { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
