import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ExceptionDetails } from '../models/exception-details';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError(err => {
      
      if (401 === err.status) {
          // logout
      }
      
      const error = this.getExceptionMessage(err);
      return throwError(error);
    }));
  }

  /**
   * Method used to get the exception message
   * 
   * @param error 
   * @returns 
   */
  getExceptionMessage(error: any): string {
    if (undefined == error) {
      return "No Exception found. Contact Admin";
    }

    if (undefined != error.error && typeof error.error === 'string') {
      let exceptionDetails = new ExceptionDetails();
      Object.assign(exceptionDetails, JSON.parse(error.error));
      return exceptionDetails.exceptionMessage;
    }

    return error.status;
  }
}
