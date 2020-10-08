import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {CookieService} from 'ngx-cookie-service';

@Injectable()
export class NoauthGuard implements CanActivate {

  constructor(private router: Router, private cookieService: CookieService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    //TODO do this the proper way

    // if (!this.cookieService.get('token')) {
    //   // not logged in so return true
    //   return true;
    // }
    //
    // // logged in so redirect to login page with the return url
    // this.router.navigate(['/challenges']);
    // return false;
    return true;
  }
}
