import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginUserData = {}; //Login user object
  isLoginError:boolean = false;

  constructor(private _auth:AuthService, private router: Router) { }

  ngOnInit() {
  }

  loginUser() {
    //console.log(this.loginUserData);
    this._auth.loginUser(this.loginUserData)
      .subscribe(
          res => { 
            console.log(res); console.log(res.created); 
            localStorage.setItem('userToken', JSON.stringify(res.id)); //store token in browser local storage
            //this.cookieService.set('userID', JSON.stringify(res.userId));
            localStorage.setItem('userID', JSON.stringify(res.userId)); //store token in browser local storage
            this.router.navigate(['/dashboard']); 
          } , //If success, show response
          err => 
          { 
            console.log(err); 
            this.isLoginError = true; 
          } //If fail, show error
        )
  }

  sendtoHome() {
    this.router.navigate(['home']);
  }
  
  sendtoSignup() {
    this.router.navigate(['signup']);
  }

  sendtoReset(){
    this.router.navigate(['reset-password']);
  }

}