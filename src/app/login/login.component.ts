import { Component, OnInit } from '@angular/core';
import {UserService} from '../_service/user.service';
import {Router} from '@angular/router';
import {AlertService} from '../_service/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string = '';
  password: string = '';
  loading: boolean = false;

  constructor(private router: Router, private userService: UserService, private alertService: AlertService) { }

  ngOnInit() {
  }

  submit() {
    if (this.username.trim().length === 0 || this.password.trim().length === 0) {
      this.alertService.error("Username and password cannot be empty");
      return;
    }

    this.loading = true;

    this.userService.login(this.username, this.password)
      .subscribe(
        data => {
          let item = JSON.stringify(data);
          localStorage.setItem('session', item);
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
