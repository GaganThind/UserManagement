import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../models/login';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  authenticate(userLogin: Login): Observable<string> {
    return this.http.post<string>(`${environment.baseRestURL}/login`, userLogin);
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    const expiresIn = localStorage.getItem('expiresIn');
    
    const isLoggedIn = token && expiresIn && (new Date().getTime() <= Number(expiresIn));
    return isLoggedIn;
  }

  setLoggedInDetails(data: string): void {
    const token = data['Authorization'].split(' ')[1].trim();
    const expiresIn = data['ExpiresIn'].trim();
    
    localStorage.setItem('token', token);
    localStorage.setItem('expiresIn', expiresIn);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('expiresIn');
  }

  isLoggedOut(): boolean {
    return !this.isLoggedIn();
  }

}
