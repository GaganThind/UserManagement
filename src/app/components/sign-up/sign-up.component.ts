import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { AddressService } from 'src/app/services/address.service';
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
  cities: any;
  states: any;
  countries: any;

  constructor(
    private userRegistrationSvc: UserRegistrationService, 
    private notificationSvc: NotificationService,
    private addressSvc: AddressService
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
      gender: new FormControl(null),
      addressLine1: new FormControl(''),
      addressLine2: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      country: new FormControl(''),
      zipcode: new FormControl('')
    });

    this.getCountries();
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
      this.notificationSvc.error("Fields marked by red border are required.");
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

  getCities(stateId: string) {
    let state = stateId.includes(':') ? stateId.split(':')[1].trim() : stateId.trim();
    this.addressSvc.getCities(this.signUpForm.get('country').value, state)
          .pipe(takeUntil(this.destroy$))
          .subscribe(
            data => {
              this.cities = data;
            },
            error => {
              this.notificationSvc.error(error);
            }
    );
  }

  getStates(countryId: string) {
    let country = countryId.includes(':') ? countryId.split(':')[1].trim() : countryId.trim();
    this.addressSvc.getStates(country)
          .pipe(takeUntil(this.destroy$))
          .subscribe(
            data => {
              this.states = data;
            },
            error => {
              this.notificationSvc.error(error);
            }
    );
  }

  getCountries() {
    this.addressSvc.getCountries()
          .pipe(takeUntil(this.destroy$))
          .subscribe(
            data => {
              this.countries = data;
            },
            error => {
              this.notificationSvc.error(error);
            }
          );
  }

  checkZipcode(event: any) {
    const country = this.signUpForm.get('country').value;
    if ("" === country) {
      this.notificationSvc.error("Country not selected", 5000);
      return false;
    }

    const zipcode = event.target.value;
    if ("" === zipcode.trim()) {
      return false;
    }

    this.addressSvc.getDataBasedOnZipcode(country, zipcode)
          .pipe(takeUntil(this.destroy$))
          .subscribe(
            data => {
              this.signUpForm.get('state').setValue(data['state']);
              this.getCities(data['state']);
              this.signUpForm.get('city').setValue(data['city']);
            },
            error => {
              this.notificationSvc.error(error);
            }
          );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
