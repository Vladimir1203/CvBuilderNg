import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../service/auth/authentication.service";
import {RegisterRequestPayload} from "../shared/dto/register-request.payload";
import {LocalStorageService} from "ngx-webstorage";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  message : string;
  registerRequestPayload: RegisterRequestPayload;
  constructor(private localStorage: LocalStorageService,private authService: AuthenticationService, private router : Router) {

  }

  ngOnInit(): void {
    this.message = this.authService.token;
  }

  tryDemoCV() {
    this.router.navigate(['/demoCV'])
  }

  tryCustomDemoCV() {
    this.router.navigate(['/customDemoCV'])
  }

  seeExamplesCV() {
    this.router.navigate(['/cvExamples'])
  }
}
