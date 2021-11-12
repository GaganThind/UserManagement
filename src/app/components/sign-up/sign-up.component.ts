import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { NotificationService } from 'src/app/services/notification.service';
import { UserRegistrationService } from 'src/app/services/user-registration.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();

  signUpForm: FormGroup;
  submitted = false;
  isLoading = false;

  constructor(
    private userRegistrationSvc: UserRegistrationService, 
    private notificationSvc: NotificationService
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

    let user: User = this.signUpForm.value;

    // Variable used to disable buttons
    this.isLoading = true;
 
    this.userRegistrationSvc.registerUser(user)
          .pipe(takeUntil(this.destroy$))
          .subscribe(
            data => {
              this.notificationSvc.success(data, 5000);
              this.isLoading = false;
              this.submitted = false;
              this.signUpForm.reset();
            },
            error => {
              this.notificationSvc.error(error);
              this.isLoading = false;
              this.submitted = false;
              this.signUpForm.get('password').reset();
              this.signUpForm.get('matchingPassword').reset();
            }
          );

  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
