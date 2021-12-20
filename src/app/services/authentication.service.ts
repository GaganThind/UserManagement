import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../models/login';
import { Observable } from 'rxjs';
import { UserDetailsService } from './user-details.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private http: HttpClient,
    private userDetailsSvc: UserDetailsService
  ) { }

  authenticate(userLogin: Login): Observable<string> {
    return this.http.post<string>(`/login`, userLogin);
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

    // Use the email/username to get the first and last name of user
    const usernameFrmServer = data['Username'].trim();
    this.userDetailsSvc.fetchUserDetails(usernameFrmServer)
                          .subscribe(
                            user => 
                            localStorage.setItem('username', 
                                                  user.firstName + ' ' + user.lastName)
                          );
  }

  getUsername() {
    return localStorage.getItem('username');
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('expiresIn');
    localStorage.removeItem('username');
  }

  isLoggedOut(): boolean {
    return !this.isLoggedIn();
  }

}
