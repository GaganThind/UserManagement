import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login/login.component';
import { NavigationComponent } from './navigation/navigation/navigation.component';
import { AboutUsComponent } from './aboutus/about-us/about-us.component';
import { ContactUsComponent } from './contactus/contact-us/contact-us.component';
import { HomeComponent } from './home/home/home.component';
import { SignUpComponent } from './signup/sign-up/sign-up.component';
import { AccountComponent } from './account/account/account.component';
import { UnknownPathComponent } from './unknownpath/unknown-path/unknown-path.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavigationComponent,
    AboutUsComponent,
    ContactUsComponent,
    HomeComponent,
    SignUpComponent,
    AccountComponent,
    UnknownPathComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
