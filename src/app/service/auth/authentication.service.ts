import {EventEmitter, Injectable, Output} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {LocalStorageService} from "ngx-webstorage";
import {Observable} from "rxjs";
import {RegisterRequestPayload} from "../../shared/dto/register-request.payload";
import {LoginRequestPayload} from "../../shared/dto/login-request.payload";
import {LoginResponse} from "../../shared/dto/login-response.payload";
import {map} from "rxjs/operators";
import {Template} from "../../templates/template/template";


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  token : string;

  ispremiumuser : boolean = false;


  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  @Output() username: EventEmitter<string> = new EventEmitter();

  constructor(private router : Router, private client : HttpClient,
              private localStorage: LocalStorageService) {
    this.token = this.localStorage.retrieve('authenticationToken');
  }

  login(loginRequestPayload: LoginRequestPayload): Observable<boolean> {
    console.log(this.client)
    return this.client.post<LoginResponse>('http://localhost:8080/auth/login',
      loginRequestPayload).pipe(map(data => {
      this.localStorage.store('authenticationToken', data.authenticationToken);
      this.localStorage.store('username', data.username);
      this.localStorage.store('refreshToken', data.refreshToken);
      this.localStorage.store('expiresAt', data.expiresAt);

      this.loggedIn.emit(true);
      this.username.emit(data.username);

      this.token = this.localStorage.retrieve('authenticationToken');
      return true;
    }));
  }

  register(registerRequestPayload : RegisterRequestPayload): Observable<any> {
    return this.client.post('http://localhost:8080/auth/signup', registerRequestPayload, { responseType: 'text' });
  }

  isUserLoggedIn(){
    if(this.token !=null)
      return true;
    return false;
  }

  logout() {
    this.token = null;
    this.localStorage.clear('authenticationToken');
    console.log("and this is your token now" + this.token);
  }

  isAuthenticated() {
   this.token = this.localStorage.retrieve('authenticationToken');
    return this.token != null;
  }

  getToken() {
    return this.token;
  }

  savePremium(registerRequestPayload : RegisterRequestPayload){
    return this.client.post('http://localhost:8080/auth/premium', registerRequestPayload).subscribe();
  }

  premiumUser(loginRequestPayload: LoginRequestPayload) {
    return this.client.post('http://localhost:8080/auth/isPremium', loginRequestPayload).subscribe(
      (response : boolean) => {
        this.ispremiumuser = response;
      },
      (error : HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }
}
