import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private router : Router, private client : HttpClient) { }

  login(vlado: string, vlado2: string) {
    return this.client.get('http://localhost:8080/test', {responseType: 'text'});
    this.router.navigate(['home']);
  }
}
