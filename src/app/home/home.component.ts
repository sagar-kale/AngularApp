import { Component, OnInit } from '@angular/core';
import { SampleService } from '../sample.service';
import { UserService } from '../core/user.service';
import { AuthService } from '../core/auth.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseUserModel } from '../core/user.model';
import { NavComponent } from '../nav/nav.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: FirebaseUserModel = new FirebaseUserModel();
  profileForm: FormGroup;

  users: Object;

  h1Style: boolean = false;

  constructor(
    private sampleService: SampleService,
    public userService: UserService,
    public authService: AuthService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private nav: NavComponent
  ) { }

  ngOnInit() {
    this.nav.checkLoggedUser();
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        this.user = data;
        this.createForm(this.user.name);
      }
    })
    this.getUsers();
  }

  firstClick() {
    this.h1Style = true;
  }
  getUsers() {
    this.sampleService.getUsers().subscribe(data => {
      this.users = data
      console.log(this.users);
    });
  }

  createForm(name) {
    this.profileForm = this.fb.group({
      name: [name, Validators.required]
    });
  }

  save(value) {
    this.userService.updateCurrentUser(value)
      .then(res => {
        console.log(res);
      }, err => console.log(err))
  }
}
