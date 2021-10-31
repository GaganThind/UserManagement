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
  rememberMe = false;
  loginForm: FormGroup;
  submitted = false;
  isLoading = false;
  errorStatus = '';

  constructor(private authSvc: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  login() {
    this.submitted = true;

    // If username or password is incorrect, then stop execution
    if (undefined === this.user.username || undefined === this.user.password) {
      return;
    }

    // Variable used to disable buttons
    this.isLoading = true;

    // Authentication
    this.authSvc.authenticate(this.user)
                .subscribe(
                    data => {
                      this.authSvc.setLoggedInDetails(data);         
                      this.router.navigateByUrl('/');
                    },
                    error => {
                      this.authSvc.logout();
                      this.errorStatus = error.status;
                      this.isLoading = false;
                    }
                );
  }

}
