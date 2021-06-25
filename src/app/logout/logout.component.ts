import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  loginMessage: string = "hello";

  constructor(private router : Router) { }

  ngOnInit(): void {
  }

  login() {
    this.router.navigate(['login']);
  }

  onClicking() {
    this.router.navigate(['home']);
  }
}
