import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {

  constructor(private http: HttpClient) { }

  fetchUserDetails(username: string): Observable<User> {
    const headers = new HttpHeaders().set('Content-Type','text/plain');
    return this.http.get<User>(`/v1/users/${username}`, { headers: headers });
  }

}
