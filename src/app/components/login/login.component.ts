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

  constructor(private authSvc: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  login() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.isLoading = true;

    this.authSvc.authenticate(this.user)
                .subscribe(
                    data => {
                      this.authSvc.setLoggedInDetails(data);          
                      this.router.navigateByUrl('/');
                    },
                    error => {
                      this.authSvc.logout();
                      this.isLoading = false;
                    }
                );
  }

}
