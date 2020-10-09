import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {config} from '../config';
import {Challenge} from '../_model/Challenge';
import {CookieService} from 'ngx-cookie-service';

@Injectable()
export class ChallengeService {

  constructor(private http: HttpClient, private cookieService: CookieService) {
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

  getAll() {
    return this.http.get<Challenge[]>(`${config.apiUrl}/challenges-service/`, this.getHttpOptions());
  }

  get(id: string) {
    return this.http.get<Challenge>(`${config.apiUrl}/challenges-service/${id}`, this.getHttpOptions());
  }

  checkFlag(challengeId: string, flag: string, userId: string) {
    let params = {"challengeId": challengeId, "flag": flag, "userId": userId};
    return this.http.post(`${config.apiUrl}/challenges-service/check`, params, this.getHttpOptions());
  }

  update(id: string, title: string, description: string, points: number, flag: string, category: string) {
    let params = {
      title: title,
      points: points,
      flag: flag,
      description: description,
      category: category
    };
    return this.http.put(`${config.apiUrl}/challenge/${id}`, params, this.getHttpOptions())
  }

  delete(id: string) {
    return this.http.delete(`${config.apiUrl}/challenge/${id}`, this.getHttpOptions());
  }

  create(title: string, points: number, flag: string, description: string, category: string) {
    const params = {
      title: title,
      points: points,
      flag: flag,
      description: description,
      category: category
    };
    return this.http.post(`${config.apiUrl}/challenge/`, params, this.getHttpOptions())
  }

}
