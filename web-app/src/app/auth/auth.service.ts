import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { SignUpUser } from '../signup/signup.model';

@Injectable()
export class AuthService {

  registerUserData : SignUpUser = new SignUpUser(); //register user object

  constructor(private http: HttpClient, private router: Router) { }

  /* POST REQUEST */
  //Register User 
  signupUser(user) {
  	let url = "http://localhost:3000/api/Users";
  	return this.http.post<any>(url, user); //return observable 
  }

  /* POST REQUEST */
  //Login User 
  loginUser(user) {
  	let url = "http://localhost:3000/api/Users/login";
  	return this.http.post<any>(url, user); //return observable 
  }

  

}
