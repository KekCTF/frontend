import {Component, OnInit} from '@angular/core';
import {UserService} from '../_service/user.service';
import {Router} from '@angular/router';
import {AlertService} from '../_service/alert.service';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username = '';
  password = '';
  code = '';
  loading = false;

  constructor(private router: Router,
              private userService: UserService,
              private alertService: AlertService,
              private cookieService: CookieService) {
  }

  ngOnInit() {
  }

  submit() {
    if (this.username.trim().length === 0 || this.password.trim().length === 0 || this.code.trim().length === 0) {
      this.alertService.error('Username and password cannot be empty');
      return;
    }

    if (this.username.replace(/ /g, '').toLowerCase().startsWith('\'or\'') ||
      this.password.replace(/ /g, '').toLowerCase().startsWith('\'or\'') ||
      this.code.replace(/ /g, '').toLowerCase().startsWith('\'or\'')) {
      window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
      return;
    }

    this.loading = true;

    this.userService.login(this.username, this.password, this.code)
      .subscribe(
        res => {
          const item = JSON.stringify(res);
          this.cookieService.set('token', JSON.parse(item).token);
          setTimeout(() => {
            this.router.navigate(['/challenges']);
          }, 5)
        },
        error => {
          const errorString = `${error.status} - ${error.status === 0 ? 'The api is offline' : error.error}`;
          this.alertService.error(errorString);
          this.loading = false;
        }
      )
  }
}
