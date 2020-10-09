import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {UserService} from '../_service/user.service';
import {AlertService} from '../_service/alert.service';
import {CookieService} from 'ngx-cookie-service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private userService: UserService, private alertService: AlertService, private cookieService: CookieService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let token = this.cookieService.get('token');

    if (token) {
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['']);
    return false;
  }
}
