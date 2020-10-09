import {Component, OnInit} from '@angular/core';
import {UserService} from '../_service/user.service';
import {AlertService} from '../_service/alert.service';
import {User} from '../_model/User';
import {Router} from '@angular/router';
import {ChallengeService} from '../_service/challenge.service';
import {Challenge} from '../_model/Challenge';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user: User = new User();
  private category: string[] = ['FORENSICS', 'WEB_EXPLOITATION', 'BINAIRY_EXPLOITATION', 'CRYPTOGRAPHY', 'REVERSE_ENGINEERING'];
  private challenges: Challenge[];

  constructor(private router: Router, private challengeService: ChallengeService, private userService: UserService, private alertService: AlertService, private cookieService: CookieService) {
  }

  ngOnInit() {
    this.challengeService.getAll().subscribe(data => {
        this.challenges = data;
      },
      error => {
        const errorString = `${error.status} - ${error.status === 0 ? 'The api is offline' : error.error}`;
        this.alertService.error(errorString);
      }
    );

  }

  logout() {
    this.cookieService.delete('token');

    setTimeout(() => {
      this.router.navigate(['/']);
    }, 5);
  }

  formatTitle(title: string): string {
    if (title.length <= 20) {
      return title;
    }

    return title.substring(0, 20) + '...';
  }

  formatDescription(description: string): string {
    if (description.length <= 35) {
      return description;
    }

    return description.substring(0, 35) + '...';
  }

  isAdmin() {
    if (this.user == null) {
      return false;
    }

    let session = JSON.parse(localStorage.getItem('session'));
    if (!session) {
      return false;
    }

    return session.user.role === 'ADMIN';
  }

  getCategoryArrays() {
    let categories = [];
    for (let val of this.category) {
      let catName = val.toLowerCase().replace('_', ' ');
      catName = catName.charAt(0).toUpperCase() + catName.slice(1);

      let item = {category: catName, challenges: []};

      item.challenges = this.getAllFromCategory(val).sort((a, b) => {
        return a.points - b.points;
      });
      categories.push(item);
    }
    return categories;
  }

  private getAllFromCategory(category: string) {
    let categoryChallenge = [];
    if (this.challenges == undefined) {
      return categoryChallenge;
    }
    for (let challenge of this.challenges) {
      if (challenge.category === category) {
        categoryChallenge.push(challenge);
      }
    }
    return categoryChallenge;
  }
}
