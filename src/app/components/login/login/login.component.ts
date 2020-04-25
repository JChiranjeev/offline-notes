import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user/user';
import { Usercontroller } from 'src/app/controllers/usercontroller/usercontroller';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  constructor(private userController: Usercontroller, private location: Location, private router: Router) { }

  ngOnInit(): void {
  }

  authUser() {
    let user: User;
    user = this.userController.getUser();
    console.log(user);
    if (user != null) {
      if (user.username == this.username) {
        if (user.password == this.password) {
          console.log("Login Successful");
          return true;
        }
      }
    } else {
      this.location.replaceState("/");
      this.router.navigate(["signup"]);
    }
  }

  signUp() {
    this.location.replaceState("/");
    this.router.navigate(["signup"]);
  }
}
