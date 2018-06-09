import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { SignUpUser } from '../signup/signup.model';


//HTTP header
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

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

  /* GET REQUEST */
  //GET User information 
  getUserInfo() {
     var ownerID = JSON.parse(localStorage.getItem('userID'));
     var token = JSON.parse(localStorage.getItem('userToken'));
     let url = "http://localhost:3000/api/Users/" + ownerID + "?access_token=" + token;
     return this.http.get<any>(url, httpOptions);
   }

   /* PUT REQUEST */
  //Update User information 
   updateUserInfo(user) {
     var ownerID = JSON.parse(localStorage.getItem('userID'));
     var token = JSON.parse(localStorage.getItem('userToken'));
     let url = "http://localhost:3000/api/Users/" + ownerID + "?access_token=" + token;
      return this.http.put<any>(url, user, httpOptions);
   }

  /* POST REQUEST */
  //Login User 
  loginUser(user) {
    let url = "http://localhost:3000/api/Users/login";
    return this.http.post<any>(url, user); //return observable 
  }

  logOut() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userID');
    this.router.navigate(['/login']);
  }
  

}