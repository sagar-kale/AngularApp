import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { Location } from '@angular/common';
import { UserService } from '../core/user.service';

@Component({
  selector: 'app-logged-nav',
  templateUrl: './logged-nav.component.html',
  styleUrls: ['./logged-nav.component.css']
})
export class LoggedNavComponent implements OnInit {

  title = "Angular App";
  isLogin: boolean = false;
  constructor(
    private authService: AuthService,
    private location: Location,
    private userService: UserService

  ) { }

  ngOnInit() {
    this.isLoggedIn();
    console.log("is loggged in : ", this.isLogin);
  }
  logout() {
    this.authService.doLogout()
      .then((res) => {
        this.location.back();
      }, (error) => {
        console.log("Logout error", error);
      });
  }
  isLoggedIn() {
    this.userService.getCurrentUser()
      .then(user => {
        this.isLogin = true
        console.log(this.isLogin)
      }, err => {
        this.isLogin = false;
      })
  }
}
