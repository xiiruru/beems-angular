import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';


//Component
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AssetsComponent } from './assets/assets.component';
import { AssetComponent } from './assets/asset/asset.component';
import { AssetDetailComponent } from './assets/asset-detail/asset-detail.component';


//Services
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';
import { PasswordResetComponent } from './password-reset/password-reset.component';


const appRoutes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
	{path: 'home', component: HomeComponent},
	{path: 'asset', component: AssetsComponent},
	{path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'reset-password', component: PasswordResetComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard]}
];


@NgModule({
  declarations: [
    AppComponent,
    AssetsComponent,
    AssetComponent,
    AssetDetailComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    PasswordResetComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
