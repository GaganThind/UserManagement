import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {

  constructor(private http: HttpClient) { }

  registerUser(user: User): Observable<string> {
    return this.http.post(`${environment.baseRestURL}/v1/users/register`, user, { responseType: 'text' });
  }

  activateUser(token: string): Observable<string> {
    return this.http.patch(`${environment.baseRestURL}/v1/users/register/verify/${token}`, token, { responseType: 'text' });
  }

}
