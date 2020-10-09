import {Component, OnInit} from '@angular/core';
import {Challenge} from '../_model/Challenge';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertService} from '../_service/alert.service';
import {ChallengeService} from '../_service/challenge.service';

@Component({
  selector: 'app-updatechallenge',
  templateUrl: './updatechallenge.component.html',
  styleUrls: ['./updatechallenge.component.scss']
})
export class UpdatechallengeComponent implements OnInit {

  challenge: Challenge = new Challenge();
  flag: string = '';
  categories: string[] = ['FORENSICS', 'WEB_EXPLOITATION', 'BINAIRY_EXPLOITATION', 'CRYPTOGRAPHY', 'REVERSE_ENGINEERING'];

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private alertService: AlertService, private challengeService: ChallengeService) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.challengeService.get(params['id']).subscribe(data => {
          this.challenge = data;
        },
        error => {
          const errorString = `${error.status} - ${error.status === 0 ? 'The api is offline' : error.error}`;
          this.alertService.error(errorString);
        }
      );
    });
  }

  submit() {
    this.challengeService.update(this.challenge.id, this.challenge.title, this.challenge.description, this.challenge.points, this.flag, this.challenge.category).subscribe(() => {
        this.router.navigate(['/admin']);
        this.alertService.success('Successfully updated the team!');
      },
      error => {
        const errorString = `${error.status} - ${error.status === 0 ? 'The api is offline' : error.error}`;
        this.alertService.error(errorString);
      }
    );
  }

}
