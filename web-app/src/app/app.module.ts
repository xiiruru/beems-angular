import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import {Ng2PageScrollModule} from 'ng2-page-scroll';


import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

//Component
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MapsComponent } from './maps/maps.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

//service
import { NotificationService } from './notifications/notification.service';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    Ng2PageScrollModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    PasswordResetComponent,
    AdminLayoutComponent
  ],
  providers: [NotificationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
