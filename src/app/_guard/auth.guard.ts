import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {UserService} from '../_service/user.service';
import {AlertService} from '../_service/alert.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private userService: UserService, private alertService: AlertService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let session = JSON.parse(localStorage.getItem('session'));

    if (session) {
      // user is logged in

      if ((new Date(session.expirationDate).getTime() - new Date().getTime()) >= 0) {
        return true;
      }

      // Session is expired, log the user out
      this.userService.logout(session.user.id).subscribe(() => {
        this.alertService.error('Session has been expired, please log in again.');
      });

      localStorage.removeItem('session');

      setTimeout(() => {
        this.router.navigate(['/']);
      }, 5);
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['']);
    return false;
  }
}
