import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { AuthService } from '../core/auth.service';
import { UserService } from '../core/user.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  title = "Angular App";

  isLoggedIn$: Observable<boolean>;
  constructor(
    private authService: AuthService,
    private router: Router,
    private userServce: UserService

  ) { }

  ngOnInit() {
    this.checkLoggedUser()
    this.isLoggedIn$ = this.authService.isLoggedIn;
  }
  logout() {
    this.authService.doLogout()
      .then((res) => {
        this.router.navigate(['/login']);
      }, (error) => {
        console.log("Logout error", error);
      });
  }
  checkLoggedUser() {
    this.userServce.getCurrentUser().then(res => {
      this.authService.setLoggedIn(true);
    })
  }
}
