import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Login } from 'src/app/models/login';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  rememberMe = false;
  loginForm: FormGroup;
  submitted = false;
  isLoading = false;
  returnUrl = '';

  private loginSubscription : Subscription;

  constructor(
    private authSvc: AuthenticationService, 
    private router: Router, 
    private route: ActivatedRoute, 
    private toastrSvc: ToastrService
  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });

    // Return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  /**
   * Method returning form control used for validation of inputs
   */
  get frm() {
    return this.loginForm.controls;
  }

  login() {
    this.submitted = true;

    // If username or password is incorrect, then stop execution
    if (this.loginForm.invalid) {
      return;
    }

    let userLogin: Login = this.loginForm.value;

    // Variable used to disable buttons
    this.isLoading = true;

    this.loginSubscription = 
        this.authSvc.authenticate(userLogin)
                      .subscribe(
                          data => {
                            this.authSvc.setLoggedInDetails(data);       
                            this.router.navigateByUrl(this.returnUrl);
                          },
                          error => {
                            this.authSvc.logout();
                            this.toastrSvc.error(error);
                            this.isLoading = false;
                            this.submitted = false;
                            this.loginForm.get('password').reset();
                          }
                      ); 
  }

  ngOnDestroy(): void {
    this.loginSubscription.unsubscribe();
  }

}
