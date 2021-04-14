import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user = new User();
  rememberMe: boolean = false;

  constructor(private http: HttpClient, private authSvc: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
  }

  login() {
   this.authSvc.authenticate(this.user).subscribe(
        data => {
          this.authSvc.setLoggedInDetails(data);          
          this.router.navigateByUrl('/');
        },
        error => {
          this.authSvc.logout();
        }
    );
  }

}
