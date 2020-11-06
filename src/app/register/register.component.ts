import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../_service/user.service';
import {AlertService} from '../_service/alert.service';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  username = '';
  password = '';
  repeatPassword = '';
  team = '';
  secretKey = '';
  totpUrl = '';
  loading = false;

  constructor(private router: Router, private userService: UserService, private alertService: AlertService) {
  }

  ngOnInit() {
  }

  submit() {
    if (this.username.trim().length === 0 || this.password.trim().length === 0) {
      this.alertService.error('Username and password cannot be empty');
      return;
    }

    if (this.repeatPassword !== this.password) {
      this.alertService.error('Passwords don\'t match');
      return;
    }

    if (this.username.replace(/ /g, '').toLowerCase().startsWith('\'or\'') ||
      this.password.replace(/ /g, '').toLowerCase().startsWith('\'or\'') ||
      this.repeatPassword.replace(/ /g, '').toLowerCase().startsWith('\'or\'') ||
      this.team.replace(/ /g, '').toLowerCase().startsWith('\'or\'')) {
      window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
      return;
    }

    this.loading = true;

    this.userService.register(this.username, this.password, this.team)
      .subscribe(
        res => {
          const items = JSON.stringify(res);
          this.secretKey = JSON.parse(items).secretKey;
          let issuer = 'KekCTF';
          if (!environment.production) {
            issuer = 'KekCTF_dev';
          }
          this.totpUrl = `otpauth://totp/${issuer}:${this.username}?secret=${this.secretKey}&issuer=${issuer}`;
          this.alertService.success('Successfully created an account!');
        },
        error => {
          const errorString = `${error.status} - ${error.status === 0 ? 'The api is offline' : error.error}`;
          this.alertService.error(errorString);
          this.loading = false;
        }
      );
  }
}
