import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
 

//Component
import { AppComponent } from './app.component';
import { AssetComponent } from './asset/asset.component';
import { HomeComponent } from './home/home.component';
import { AssetDetailComponent } from './asset-detail/asset-detail.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

//Services
import { AuthService } from './auth.service';

const appRoutes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
	{path: 'home', component: HomeComponent},
	{path: 'asset', component: AssetDetailComponent},
	{path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    AssetComponent,
    HomeComponent,
    AssetDetailComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FormsModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
