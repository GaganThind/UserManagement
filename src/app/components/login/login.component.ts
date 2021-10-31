import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Login } from 'src/app/models/login';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userLogin = new Login();
  rememberMe = false;
  loginForm: FormGroup;
  submitted = false;
  isLoading = false;
  errorStatus = '';
  returnUrl = '';

  constructor(private authSvc: AuthenticationService, private router: Router, private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });

    // Return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    this.submitted = true;

    // If username or password is incorrect, then stop execution
    if (undefined === this.userLogin.username || undefined === this.userLogin.password) {
      return;
    }

    // Variable used to disable buttons
    this.isLoading = true;

    // Authentication
    this.authSvc.authenticate(this.userLogin)
                .subscribe(
                    data => {
                      this.authSvc.setLoggedInDetails(data);         
                      this.router.navigateByUrl(this.returnUrl);
                    },
                    error => {
                      this.authSvc.logout();
                      this.errorStatus = error.status;
                      this.isLoading = false;
                    }
                );
  }

}
