import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Injectable } from '@angular/core';

import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthenticationService, private router : Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(this.authService.isAuthenticated())
      return true;
    this.router.navigate(['login']);
    return false;
  }
}
