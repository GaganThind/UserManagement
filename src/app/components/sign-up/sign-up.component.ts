import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { UserRegistrationService } from 'src/app/services/user-registration.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  user = new User();
  loginForm: FormGroup;
  submitted = false;
  isLoading = false;

  constructor(
    private userRegistrationSvc: UserRegistrationService, 
    private toastrSvc: ToastrService
  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      matchingPassword: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', Validators.required),
      dob: new FormControl(''),
      gender: new FormControl('')
    });
  }

  signUp() {
    this.submitted = true;

    // If required fields are not present, then return. The UI will automatically display errors.
    if (this.areRequiredFieldsNotSet()) {
      return;
    }

    // Variable used to disable buttons
    this.isLoading = true;

    this.userRegistrationSvc.registerUser(this.user)
                            .subscribe(
                              data => {
                                this.toastrSvc.success(data);
                                this.isLoading = false;
                              },
                              error => {
                                this.toastrSvc.error(error);
                                this.isLoading = false;
                              }
                            );
  }

  private areRequiredFieldsNotSet() {
    return undefined === this.user.firstName || undefined === this.user.lastName
      || undefined === this.user.email || undefined === this.user.password
      || undefined === this.user.matchingPassword;
  }
}
