import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  registerUserData = {}; //register user object

  constructor(private _auth:AuthService) { }

  ngOnInit() {
  }

  signUp() {
  	//console.log(this.registerUserData);
  	this._auth.signupUser(this.registerUserData)
  		.subscribe(
  			res => console.log(res), //If success, show response
  			err => console.log(err) //If fail, show error
  			)
  }
}
