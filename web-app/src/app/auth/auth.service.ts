import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { SignUpUser } from '../signup/signup.model';


//HTTP header
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

var url = 'http://1e51332b.ngrok.io/api/Users/'

@Injectable()
export class AuthService {

  registerUserData : SignUpUser = new SignUpUser(); //register user object
  constructor(private http: HttpClient, private router: Router) { }

  /* POST REQUEST */
  //Register User 
  signupUser(user) {
    return this.http.post<any>(url, user); //return observable 
  }

  /* GET REQUEST */
  //GET User information 
  getUserInfo() {
     var ownerID = JSON.parse(localStorage.getItem('userID'));
     var token = JSON.parse(localStorage.getItem('userToken'));
     let dbUrl = url + ownerID + "?access_token=" + token;
     return this.http.get<any>(dbUrl, httpOptions);
   }

   /* PUT REQUEST */
  //Update User information 
   updateUserInfo(user) {
     var ownerID = JSON.parse(localStorage.getItem('userID'));
     var token = JSON.parse(localStorage.getItem('userToken'));
     let dbUrl = url + ownerID + "?access_token=" + token;
      return this.http.put<any>(dbUrl, user, httpOptions);
   }

  /* POST REQUEST */
  //Login User 
  loginUser(user) {
    let dbUrl = url + "login";
    return this.http.post<any>(dbUrl, user); //return observable 
  }

  logOut() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userID');
    this.router.navigate(['/login']);
  }
  

}