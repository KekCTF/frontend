import {Component, OnInit} from '@angular/core';
import {AlertService} from '../_service/alert.service';
import {UserService} from '../_service/user.service';
import {User} from '../_model/User';
import {interval} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss']
})
export class ScoreboardComponent implements OnInit {

  users: User[];
  hideBtn: boolean = false;

  timer;

  constructor(private router: Router, private userService: UserService, private alertService: AlertService) {
  }

  ngOnInit() {
    this.updateScoreboard();

    this.timer = interval(5000).subscribe(() => {
      this.checkIfRightPath();
      this.updateScoreboard();
    });
  }

  checkIfRightPath() {
    if (this.router.url !== '/scoreboard') {
      this.timer.unsubscribe();
    }
  }

  updateScoreboard() {
    this.userService.getAll().subscribe(data => {

      data.sort((a, b) => {
        if ((b.points - a.points) !== 0) {
          return b.points - a.points;
        }

        return new Date(a.lastSubmit).getTime() - new Date(b.lastSubmit).getTime();
      });

      this.users = data;
    }, error => {
      const errorString = `${error.status} - ${error.status === 0 ? 'The api is offline' : error.error}`;
      this.alertService.error(errorString);
    });
  }
}
