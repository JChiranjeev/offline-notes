import { Component, OnInit } from '@angular/core';
import { Usercontroller } from 'src/app/controllers/usercontroller/usercontroller';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  username: string;
  password: string;
  repeatPassword: string;

  constructor(private userController: Usercontroller, private location: Location, private router: Router) { }

  ngOnInit(): void {
  }

  signUp() {
    let user: User = new User();
    if(this.password == this.repeatPassword) {
      sessionStorage.setItem("username", this.username);
      sessionStorage.setItem("password",this.password);
      user.username = this.username;
      user.password = this.password;
      if(this.userController.setUser(user)) {
    this.location.replaceState("/");
    this.router.navigate(["login"]);
      }
    } else {
      console.log("Passwords don't match.");
    }
  }

}
