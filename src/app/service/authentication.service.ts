import {EventEmitter, Injectable, Output} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {LocalStorageService} from "ngx-webstorage";
import {Observable} from "rxjs";
import {RegisterRequestPayload} from "../shared/dto/register-request.payload";
import {LoginRequestPayload} from "../shared/dto/login-request.payload";
import {LoginResponse} from "../shared/dto/login-response.payload";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  @Output() username: EventEmitter<string> = new EventEmitter();

  constructor(private router : Router, private client : HttpClient,
              private localStorage: LocalStorageService) {}

  login(loginRequestPayload: LoginRequestPayload): Observable<boolean> {
    return this.client.post<LoginResponse>('http://localhost:8080/auth/login',
      loginRequestPayload).pipe(map(data => {
      this.localStorage.store('authenticationToken', data.authenticationToken);
      this.localStorage.store('username', data.username);
      this.localStorage.store('refreshToken', data.refreshToken);
      this.localStorage.store('expiresAt', data.expiresAt);

      this.loggedIn.emit(true);
      this.username.emit(data.username);
      return true;
    }));
  }

  register(registerRequestPayload : RegisterRequestPayload): Observable<any> {
    return this.client.post('http://localhost:8080/auth/signup', registerRequestPayload, { responseType: 'text' });
  }
}
