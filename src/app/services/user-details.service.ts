import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {

  constructor(private http: HttpClient) { }

  fetchUserDetails(username: string): Observable<User> {
    const headers = new HttpHeaders().set('Content-Type','text/plain');
    return this.http.get<User>(`${environment.baseRestURL}/v1/users/${username}`, { headers: headers });
  }

}
