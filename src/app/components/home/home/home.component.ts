import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Usercontroller } from 'src/app/controllers/usercontroller/usercontroller';
import { User } from 'src/app/models/user/user';
import { PlatformLocation } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: User;

  constructor(private router: Router, private location: Location, private userController: Usercontroller, private platformLocation: PlatformLocation) {
    platformLocation.onPopState(() => {
      console.log("Back Pressed");
    })
  }

  ngOnInit(): void {
    if (sessionStorage.getItem("username") == null) {
      this.location.replaceState("/");
      this.router.navigate(["login"]);
    } else {
      this.user = this.userController.getUser(sessionStorage.getItem("username"));
      console.log("The Username is: " + this.user.username);
    }
  }
}
