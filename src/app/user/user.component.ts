import { Component, OnInit } from '@angular/core';
import { UserService } from '../core/user.service';
import { AuthService } from '../core/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseUserModel } from '../core/user.model';
import { SampleService } from '../sample.service';
import { User } from '../user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userForm: FormGroup;
  submitted = false;
  success = false;
  isNew = true;
  message = null;
  private userdata: User = new User;
  allUsers: User[];
  userIdUpdate = null;

  constructor(
    public userService: UserService,
    public authService: AuthService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    private formBuilder: FormBuilder,
    private sampleService: SampleService
  ) {

  }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      age: ['', Validators.required],
      city: ['', Validators.required]
    });
    this.getAllUsers();
  }

  getAllUsers() {
    this.sampleService.getAllUsers().subscribe(res => {
      this.allUsers = res;
    });

  }

  onSubmit() {

    if (this.userForm.invalid) {
      return;
    }
    this.createUser(this.userForm.value)

  }


  createUser(user: User) {


    if (this.userIdUpdate == null) {
      console.log("creating new user::: ", user);
      this.sampleService.addUser(user).subscribe(res => {
        this.message = 'User Added Successfully';
        this.getAllUsers();
        console.log(res);
        this.submitted = true;
        this.success = true;
        this.userForm.reset();
        console.log("submitted");
      });
    } else {
      console.log("updating existing user:: ", user);
      user._id = this.userIdUpdate;
      this.sampleService.updateUser(user).subscribe(data => {
        this.message = 'Record Updated Successfully';
        this.getAllUsers();
        this.userIdUpdate = null;
        this.isNew = true;
        this.userForm.reset();
        console.log("updated user :: ", data)
      });
    }
  }

  loadUserToEdit(userId: string) {
    this.sampleService.getUserById(userId).subscribe(user => {
      this.message = null;
      this.isNew = false;
      this.userIdUpdate = user._id;
      this.userForm.patchValue(user);
      // this.userForm.controls['name'].setValue(user.name);  
      // this.userForm.controls['age'].setValue(user.age);  
      // this.userForm.controls['email'].setValue(user.email);  
      // this.userForm.controls['city'].setValue(user.city);  
    });

  }


  deleteUser(userId: string) {
    this.sampleService.deleteUserByUserId(userId).subscribe(data => {
      console.log("deleted :: ", data);
      this.getAllUsers();
      this.message = "Record Deleted";
    })
  }


}
