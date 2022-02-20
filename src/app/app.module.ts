import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// User Modules
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule, routingComponents } from './app-routing.module';

// Components
import { AppComponent } from './app.component';
import { NotificationComponent } from './components/notification/notification.component';

// Guards
import { AuthGuard } from './guard/auth.guard';

// Interceptors
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { HttpRequestInterceptor } from './interceptors/http-request.interceptor';

// Services
import { AuthenticationService } from './services/authentication.service';
import { UserRegistrationService } from './services/user-registration.service';
import { NotificationService } from './services/notification.service';
import { UserDetailsService } from './services/user-details.service';
import { AddressService } from './services/address.service';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgbModule
  ],
  providers: [
    AuthenticationService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    AuthGuard,
    UserRegistrationService,
    NotificationService,
    UserDetailsService,
    AddressService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
