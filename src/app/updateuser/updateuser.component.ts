import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertService} from '../_service/alert.service';
import {User} from '../_model/User';
import {UserService} from '../_service/user.service';

@Component({
  selector: 'app-updateuser',
  templateUrl: './updateuser.component.html',
  styleUrls: ['./updateuser.component.scss']
})
export class UpdateuserComponent implements OnInit {

  user: User = new User();
  password = '';

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private alertService: AlertService,
              private userService: UserService) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.userService.get(params.id).subscribe(data => {
          this.user = data;
        },
        error => {
          const errorString = `${error.status} - ${error.status === 0 ? 'The api is offline' : error.error}`;
          this.alertService.error(errorString);
        }
      );
    });
  }

  submit() {
    this.userService.update(this.user.id, this.user.username, this.password, this.user.teamName).subscribe(() => {
        this.router.navigate(['/admin']);
        this.alertService.success('Successfully updated the user!');
      },
      error => {
        const errorString = `${error.status} - ${error.status === 0 ? 'The api is offline' : error.error}`;
        this.alertService.error(errorString);
      }
    );
  }
}
