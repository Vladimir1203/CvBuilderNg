import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../service/login/authentication.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router : Router, private authService : AuthenticationService) { }

  ngOnInit(): void {
  }

  onClickingLogin() {
    this.authService.login("vlado", "vlado").subscribe(
      response=>{
        console.log(response);
      }
    );
  }

  onClickingRegister() {
    this.router.navigate(['registration']);
  }
}
