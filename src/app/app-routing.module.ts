import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login/login.component';
import { SignupComponent } from './components/signup/signup/signup.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
