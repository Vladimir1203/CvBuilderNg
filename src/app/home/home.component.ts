import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../service/authentication.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  message : string;

  constructor(private authService : AuthenticationService) { }

  ngOnInit(): void {
    this.message = this.authService.token;
  }



}
