import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { AccountComponent } from './components/account/account.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { HomeComponent } from './components/home/home.component';
import { HotelComponent } from './components/hotel/hotel.component';
import { LoginComponent } from './components/login/login.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { UnknownPathComponent } from './components/unknown-path/unknown-path.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'account',
    children:[
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignUpComponent },
      { path: 'password/reset', component: ResetPasswordComponent },
      { path: 'settings', component: AccountComponent, canActivate: [ AuthGuard ] },
    ]
  },
  { path: 'aboutus', component: AboutUsComponent },
  { path: 'contactus', component: ContactUsComponent },
  { path: '**', component: UnknownPathComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [ 
  LoginComponent,
  NavigationComponent,
  AboutUsComponent,
  ContactUsComponent,
  HomeComponent,
  SignUpComponent,
  AccountComponent,
  UnknownPathComponent,
  HotelComponent,
  ResetPasswordComponent
]