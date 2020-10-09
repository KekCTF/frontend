import {Component, OnInit} from '@angular/core';
import {AlertService} from '../_service/alert.service';
import {UserService} from '../_service/user.service';
import {User} from '../_model/User';
import {interval} from 'rxjs';
import {Router} from '@angular/router';
import {TeamService} from '../_service/team.service';
import {Challenge} from '../_model/Challenge';
import {Team} from '../_model/Team';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss']
})
export class ScoreboardComponent implements OnInit {

  teams: Team[];
  hideBtn: boolean = false;

  timer;

  constructor(private router: Router, private teamService: TeamService, private alertService: AlertService) {
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
    this.teamService.getAll().subscribe(data => {

      data.sort((a: Team, b: Team) => {
        let ap = a.points;
        let bp = b.points;
        return ap > bp ? -1 : 1;
      });

      this.teams = data;
    }, error => {
      const errorString = `${error.status} - ${error.status === 0 ? 'The api is offline' : error.error}`;
      this.alertService.error(errorString);
    });
  }
}
