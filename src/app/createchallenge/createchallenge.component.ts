import {Component, OnInit} from '@angular/core';
import {Challenge} from '../_model/Challenge';
import {Router} from '@angular/router';
import {AlertService} from '../_service/alert.service';
import {ChallengeService} from '../_service/challenge.service';

@Component({
  selector: 'app-createchallenge',
  templateUrl: './createchallenge.component.html',
  styleUrls: ['./createchallenge.component.scss']
})
export class CreatechallengeComponent implements OnInit {

  challenge: Challenge = new Challenge();
  flag: string = '';
  categories: string[] = ['FORENSICS', 'WEB_EXPLOITATION', 'BINAIRY_EXPLOITATION', 'CRYPTOGRAPHY', 'REVERSE_ENGINEERING'];

  constructor(private router: Router, private alertService: AlertService, private challengeService: ChallengeService) {
  }

  ngOnInit() {
    this.challenge.description = '';
  }

  submit() {
    this.challengeService.create(this.challenge.title, this.challenge.points, this.flag, this.challenge.description, this.challenge.category).subscribe(() => {
        this.router.navigate(['/admin']);
        this.alertService.success('Successfully created team!')
      },
      error => {
        const errorString = `${error.status} - ${error.status === 0 ? 'The api is offline' : error.error}`;
        this.alertService.error(errorString);
      });
  }

}
