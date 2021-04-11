import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';
  rememberMe: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  login() {
    alert("Login clicked " + this.email + " : " + this.password + " : " + this.rememberMe);
    
    // Spring boot login method

  }

}
