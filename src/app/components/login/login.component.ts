import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user = new User();
  rememberMe: boolean = false;
  loginForm: FormGroup;

  constructor(private http: HttpClient, private authSvc: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  login() {
   this.authSvc.authenticate(this.user).subscribe(
        data => {
          this.authSvc.setLoggedInDetails(data);          
          this.router.navigateByUrl('/');
        },
        error => {
          this.authSvc.logout();
        }
    );
  }

  forgotPassword() {
    this.router.navigateByUrl('/password');
  }

}
