import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth/auth.service';
import { NotificationService } from '../notifications/notification.service';
import { userProfile } from './user.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user : userProfile = new userProfile();

  constructor(private _auth:AuthService, private notify : NotificationService) { }

  ngOnInit() {
  	//retrieve user info
  	 this._auth.getUserInfo().subscribe(res =>{
      console.log(res);
      this.user = {
      	realm : res.realm,
      	email : res.email,
        password : null,
        cfmPassword : null
      }
    }, err => {
      console.log(err);
    })

  }

  //Clear user profile
  clearProfile() {
    this.user = {
        realm : '',
        email : '',
        password : null,
        cfmPassword : null
      }
  }

  //Update user profile
  updateProfile() {
  	if(this.user.password == this.user.cfmPassword) {
  		var body = {
  			realm : this.user.realm,
  			email : this.user.email,
  			password : this.user.password
  		}
  		this._auth.updateUserInfo(body).subscribe(res =>{
	      console.log(res);
        this.notify.showNotification('bottom','right','info','<b>User Profile<b>','User profile updated!');
        this.notify.notificationPush.push('User profile updated!');
        this.clearProfile();
	 
	    }, err => {
	      console.log(err);
        this.notify.showNotification('bottom','right','danger','<b>User Profile<b>','Error has occured!');
	    })

  	}
  	
  	 
  }



}
