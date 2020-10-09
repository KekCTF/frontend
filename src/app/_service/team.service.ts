import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {config} from '../config';
import {Team} from '../_model/Team';

@Injectable()
export class TeamService {

  constructor(private http: HttpClient, private cookieService: CookieService) {
  }

  getAll() {
    return this.http.get<Team[]>(`${config.apiUrl}/team-service/`, this.getHttpOptions());
  }

  private getHttpOptions(responseType: string = 'json') {
    let token = this.cookieService.get('token');
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
  }
}
