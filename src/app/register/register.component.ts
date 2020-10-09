import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../_service/user.service';
import {AlertService} from '../_service/alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  username: string = '';
  password: string = '';
  repeatPassword: string = '';
  team: string = '';
  secretKey: string = '';
  totpUrl: string = '';
  loading: boolean = false;

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

    this.loading = true;

    this.userService.register(this.username, this.password, this.team)
      .subscribe(
        res => {
          let items = JSON.stringify(res);
          this.secretKey = JSON.parse(items).secretKey;
          this.totpUrl = "otpauth://totp/KekCTF:" + this.username + "?secret=" + this.secretKey + "&issuer=KekCTF";
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
