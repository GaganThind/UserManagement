import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor(
    public authSvc: AuthenticationService, 
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  get username() {
    return this.authSvc.getUsername();
  }

  logout() {
    this.authSvc.logout();
    this.router.navigateByUrl('/');
  }

}
