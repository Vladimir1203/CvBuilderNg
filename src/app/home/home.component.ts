import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../service/auth/authentication.service";
import {RegisterRequestPayload} from "../shared/dto/register-request.payload";
import {LocalStorageService} from "ngx-webstorage";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  message : string;
  registerRequestPayload: RegisterRequestPayload;
  constructor(private localStorage: LocalStorageService,private authService: AuthenticationService) {

  }

  ngOnInit(): void {
    this.message = this.authService.token;
  }

}
