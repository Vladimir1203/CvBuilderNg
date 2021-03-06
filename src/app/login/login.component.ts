import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../service/auth/authentication.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginRequestPayload} from "../shared/dto/login-request.payload";
import {throwError} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginRequestPayload: LoginRequestPayload;
  private isError: boolean;
  loggedUsername : string;
  constructor(private router : Router, private authService : AuthenticationService) {
    this.loginRequestPayload = {
      username: '',
      password: ''
    }

  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', Validators.required)
    })
  }

  onClickingLogin() {
    if(!this.allFieldsValid()) {
      alert("You need to fill your username and password!")
      return;
    }

    this.loginRequestPayload.username = this.loginForm.get('username').value;
    this.loginRequestPayload.password = this.loginForm.get('password').value;

    this.authService.login(this.loginRequestPayload).subscribe(data => {
      this.isError = false;
      this.loggedUsername = this.loginRequestPayload.username;
      this.authService.premiumUser(this.loginRequestPayload)
      this.router.navigateByUrl('home');
    }, error => {
      this.isError = true;
      alert("Invalid credentials!")
      throwError(error);
    });


  }

  allFieldsValid() {
    return this.loginForm.get('username').valid && this.loginForm.get('password').valid;
  }

  onClickingRegister() {
    this.router.navigate(['registration']);
  }
}
