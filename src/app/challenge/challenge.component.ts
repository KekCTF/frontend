import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ChallengeService} from '../_service/challenge.service';
import {Challenge} from '../_model/Challenge';
import {AlertService} from '../_service/alert.service';

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.scss']
})
export class ChallengeComponent implements OnInit {

  flag: string = '';

  challenge: Challenge = new Challenge();
  private challengeId: string;

  constructor(private activatedRoute: ActivatedRoute, private challengeService: ChallengeService, private alertService: AlertService) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.challengeId = params['id'];
      this.refreshChallenge();
    });
  }

  refreshChallenge() {
    this.challengeService.get(this.challengeId).subscribe(data => {
        this.challenge = data;
      },
      error => {
        const errorString = `${error.status} - ${error.status === 0 ? 'The api is offline' : error.error}`;
        this.alertService.error(errorString);
      });
  }

  submitFlag() {
    let challengeId = this.challenge.id;

    this.challengeService.checkFlag(challengeId, this.flag).subscribe(() => {
        this.alertService.success('Flag correct! Points added to your account!');
        this.refreshChallenge();
      },
      error => {
        const errorString = `${error.status} - ${error.status === 0 ? 'The api is offline' : error.error}`;
        this.alertService.error(errorString);
        this.refreshChallenge();
      });
  }

}
