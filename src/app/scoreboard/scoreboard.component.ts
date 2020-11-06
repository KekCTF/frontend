import {Component, OnInit} from '@angular/core';
import {AlertService} from '../_service/alert.service';
import {interval} from 'rxjs';
import {Router} from '@angular/router';
import {TeamService} from '../_service/team.service';
import {Team} from '../_model/Team';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss']
})
export class ScoreboardComponent implements OnInit {

  teams: Team[];
  selfTeamName = '';
  hideBtn = false;

  timer;

  constructor(private router: Router, private teamService: TeamService, private alertService: AlertService) {
  }

  ngOnInit() {
    this.updateScoreboard();

    this.timer = interval(5000).subscribe(() => {
      if (this.checkIfRightPath()) {
        this.updateScoreboard();
      }
    });
  }

  checkIfRightPath(): boolean {
    if (this.router.url !== '/scoreboard') {
      this.timer.unsubscribe();
      return false;
    }
    return true;
  }

  updateScoreboard() {
    this.teamService.getAll().subscribe(data => {

      data.sort((a: Team, b: Team) => {
        const ap = a.points;
        const bp = b.points;
        return ap > bp ? -1 : 1;
      });

      data.forEach(team => {
        if (JSON.parse(JSON.stringify(team)).self === true) {
          this.selfTeamName = team.name;
        }
      })

      this.teams = data;
    }, error => {
      const errorString = `${error.status} - ${error.status === 0 ? 'The api is offline' : error.error}`;
      this.alertService.error(errorString);
    });
  }
}
