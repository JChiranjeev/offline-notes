import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login/login.component';
import { FormsModule } from '@angular/forms';

import { StorageServiceModule } from 'ngx-webstorage-service';
import { LocalstorageService } from './services/localstorage/localstorage.service';
import { Usercontroller } from './controllers/usercontroller/usercontroller';
import { SignupComponent } from './components/signup/signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [LocalstorageService,Usercontroller],
  bootstrap: [AppComponent]
})
export class AppModule { }
