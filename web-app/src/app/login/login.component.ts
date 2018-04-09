import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginUserData = {}; //Login user object

  constructor(private _auth:AuthService) { }

  ngOnInit() {
  }

  loginUser() {
  	//console.log(this.loginUserData);
  	this._auth.loginUser(this.loginUserData)
  		.subscribe(
  			res => console.log(res), //If success, show response
  			err => console.log(err) //If fail, show error
  			)
  }

}
