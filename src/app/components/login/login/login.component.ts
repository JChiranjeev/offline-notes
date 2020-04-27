import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user/user';
import { Usercontroller } from 'src/app/controllers/usercontroller/usercontroller';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Book } from 'src/app/models/book/book';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUsername: string;
  loginPassword: string;
  signupUsername: string;
  signupPassword: string;
  signupRepeatPassword: string;
  loginOrSignup: string = null;
  loginForm: Element;
  signupForm: Element;

  constructor(private userController: Usercontroller, private location: Location, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loginOrSignup = this.router.url;
    this.loginForm = document.getElementsByClassName("login-form")[0];
    this.signupForm = document.getElementsByClassName("signup-form")[0];
    this.loginForm.classList.add("hidden");
    this.signupForm.classList.add("hidden");
    if (this.loginOrSignup.includes("login")) {
      this.loginForm.classList.remove("hidden");
    } else if (this.loginOrSignup.includes("signup")) {
      this.signupForm.classList.remove("hidden");
    } else {
      this.loginForm.classList.remove("hidden");
    }
  }

  // data-aos="fade-down" data-aos-duration="1000" data-aos-once="false" data-aos-easing="ease-in-out"
  // addAnimation(incomingForm: Element, outgoingForm: Element) {
  //   incomingForm.classList.add("animated");
  //   incomingForm.classList.add("slideInRight");
  //   incomingForm.classList.add("delay-2s");

  //   outgoingForm.classList.add("animated");
  //   incomingForm.classList.add("slideOutLeft");
  //   incomingForm.classList.add("delay-2s");
  // }

  loadLoginForm() {
    this.loginForm.classList.remove("hidden");
    this.signupForm.classList.add("hidden");
    // this.addAnimation(this.loginForm,this.signupForm);
  }

  loadSignupForm() {
    this.loginForm.classList.add("hidden");
    this.signupForm.classList.remove("hidden");
    // this.addAnimation(this.signupForm,this.loginForm);
  }

  login() {
    try {
      sessionStorage.setItem("password", this.loginPassword);
      let user: User;
      user = this.userController.getUser(this.loginUsername);
      console.log(user);
      if (user != null) {
        if (user.username == this.loginUsername) {
          if (user.password == this.loginPassword) {
            sessionStorage.setItem("username", this.loginUsername);
            sessionStorage.setItem("password", this.loginPassword);
            console.log("Login Successful");
            this.location.replaceState("/");
            this.router.navigate(["home"]);
            return true;
          } else {
            this.toastr.error("Incorrect Password. Please try again", null, {
              positionClass: 'toast-bottom-right'
            });
          }
        };
      } else {
        this.toastr.warning("Account does not exist. Please Signup", null, {
          positionClass: 'toast-bottom-right'
        });
      }
    } catch (error) {
      console.log(error);
      this.toastr.error("Incorrect Password. Please try again", null, {
        positionClass: 'toast-bottom-right'
      });
    }
  }

  signup() {
    let user: User = new User();
    let tempUser = this.userController.getUser(this.signupUsername);
    if (tempUser != null) {
      this.toastr.warning("Username already registered. Please Login", null, {
        positionClass: 'toast-bottom-right'
      });
      return false;
    } else {
      if (this.signupPassword == this.signupRepeatPassword) {
        sessionStorage.setItem("username", this.signupUsername);
        sessionStorage.setItem("password", this.signupPassword);
        user.username = this.signupUsername;
        user.password = this.signupPassword;
        user.books = new Array<Book>();
        if (this.userController.addUser(this.signupUsername, user)) {
          this.location.replaceState("/");
          this.router.navigate(["login"]);
        }
      } else {
        console.log("Passwords don't match.");
      }
    }
  }
}
