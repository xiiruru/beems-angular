import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  isPwdError:boolean;
  isBlank:boolean;


  constructor(private router: Router, private _auth:AuthService) { }

  ngOnInit() {
  }



  resetForm() {
     this._auth.registerUserData = {
      first_name : "",
      last_name : "",
      email: "",
      password : "",
      cfmPassword : ""
    }
  }

  signUp() {

    this.isPwdError = false;

    //console.log(this._auth.registerUserData);
    //If password matched
    if(this._auth.registerUserData.password == this._auth.registerUserData.cfmPassword) {

      var body = {
      realm : this._auth.registerUserData.first_name + " " + this._auth.registerUserData.last_name,
      email : this._auth.registerUserData.email,
      password : this._auth.registerUserData.password
    }

    console.log(body);
    
    this._auth.signupUser(body)
      .subscribe(
        res => { console.log(res); this.resetForm(); this.sendtoLogin();} , //If success, show response
        err => { console.log(err);} //If fail, show error
        )
    }
    else
     this.isPwdError = true; //Password not match
  }

   sendtoLogin(){
    this.router.navigate(['login']);
  }

  sendtoHome(){
    this.router.navigate(['home']);
  }
}