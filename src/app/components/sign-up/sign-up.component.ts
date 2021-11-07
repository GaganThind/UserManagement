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

  signUpForm: FormGroup;
  submitted = false;
  isLoading = false;

  constructor(
    private userRegistrationSvc: UserRegistrationService, 
    private toastrSvc: ToastrService
  ) { }

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      matchingPassword: new FormControl('', Validators.required),
      phoneNumber: new FormControl(''),
      dob: new FormControl(''),
      gender: new FormControl(null)
    });
  }

  /**
   * Method returning form control used for validation of inputs
   */
  get frm() {
    return this.signUpForm.controls;
  }

  signUp() {
    this.submitted = true;

    // If required fields are not present, then return. The UI will automatically display errors.
    if (this.signUpForm.invalid) {
      return;
    }

    let user = this.signUpForm.value;

    // Variable used to disable buttons
    this.isLoading = true;

    this.userRegistrationSvc.registerUser(user)
                            .subscribe(
                              data => {
                                this.toastrSvc.success(data);
                                this.isLoading = false;
                                this.submitted = false;
                                this.signUpForm.reset();
                              },
                              error => {
                                this.toastrSvc.error(error);
                                this.isLoading = false;
                                this.submitted = false;
                              }
                            );

  }

}
