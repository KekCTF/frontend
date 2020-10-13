import {Component, OnInit} from '@angular/core';
import {Challenge} from '../_model/Challenge';
import {AlertService} from '../_service/alert.service';
import {ChallengeService} from '../_service/challenge.service';
import {UserService} from '../_service/user.service';
import {User} from '../_model/User';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  challenges: Challenge[];
  users: User[];

  constructor(private alertService: AlertService, private challengeService: ChallengeService, private userService: UserService) {
  }

  ngOnInit() {
    this.updateChallenges();
    this.updateUsers();
  }

  updateChallenges() {
    this.challengeService.getAll().subscribe(data => {
        this.challenges = data;
      },
      error => {
        const errorString = `${error.status} - ${error.status === 0 ? 'The api is offline' : error.error}`;
        this.alertService.error(errorString);
      });
  }

  updateUsers() {
    this.userService.getAll().subscribe(data => {
        this.users = data;
      },
      error => {
        const errorString = `${error.status} - ${error.status === 0 ? 'The api is offline' : error.error}`;
        this.alertService.error(errorString);
      });
  }

  deleteChallenge(id: string) {
    const challenge = this.getChallenge(id);
    if (!confirm(`Are you sure you want to delete challenge '${challenge.title}'?\n\nTHIS CANNOT BE UNDONE!`)) {
      return;
    }

    this.challengeService.delete(id).subscribe(() => {
        this.updateChallenges();
      },
      error => {
        const errorString = `${error.status} - ${error.status === 0 ? 'The api is offline' : error.error}`;
        this.alertService.error(errorString);
      });
  }

  deleteUser(id: string) {
    const user = this.getUser(id);
    if (!confirm(`Are you sure you want to delete user '${user.username}'?\n\nTHIS CANNOT BE UNDONE!`)) {
      return;
    }

    this.userService.delete(id).subscribe(() => {
        this.updateUsers();
      },
      error => {
        const errorString = `${error.status} - ${error.status === 0 ? 'The api is offline' : error.error}`;
        this.alertService.error(errorString);
      });
  }

  isAdmin(id: string): boolean {
    const user = this.getUser(id);
    return user.role === 'ADMIN';
  }

  promoteUser(id: string) {
    const user = this.getUser(id);
    if (!confirm(`Are you sure you want to promote user '${user.username}'?\n\nTHIS CANNOT BE REVERSED!`)) {
      return;
    }

    this.userService.promote(id).subscribe(() => {
        this.updateUsers();
      },
      error => {
        const errorString = `${error.status} - ${error.status === 0 ? 'The api is offline' : error.error}`;
        this.alertService.error(errorString);
      });
  }

  private getUser(id: string): User {
    for (const user of this.users) {
      if (user.id === id) {
        return user;
      }
    }
  }

  private getChallenge(id: string): Challenge {
    for (const challenge of this.challenges) {
      if (challenge.id === id) {
        return challenge;
      }
    }
  }
}
