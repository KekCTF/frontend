import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {config} from '../config';
import {Challenge} from '../_model/Challenge';

@Injectable()
export class ChallengeService {

  constructor(private http: HttpClient) {
  }

  private static getHttpOptions(responseType: string = 'json') {
    let sessionId = JSON.parse(localStorage.getItem('session')).id;
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'sessionId': sessionId
      })
    };
  }

  getAll() {
    return this.http.get<Challenge[]>(`${config.apiUrl}/challenge/`, ChallengeService.getHttpOptions());
  }

  get(id: string) {
    return this.http.get<Challenge>(`${config.apiUrl}/challenge/${id}`, ChallengeService.getHttpOptions());
  }

  checkFlag(challengeId: string, flag: string, userId: string) {
    let params = {"challengeId": challengeId, "flag": flag, "userId": userId};
    return this.http.post(`${config.apiUrl}/challenge/check`, params, ChallengeService.getHttpOptions());
  }

  update(id: string, title: string, description: string, points: number, flag: string, category: string) {
    let params = {
      title: title,
      points: points,
      flag: flag,
      description: description,
      category: category
    };
    return this.http.put(`${config.apiUrl}/challenge/${id}`, params, ChallengeService.getHttpOptions())
  }

  delete(id: string) {
    return this.http.delete(`${config.apiUrl}/challenge/${id}`, ChallengeService.getHttpOptions());
  }

  create(title: string, points: number, flag: string, description: string, category: string) {
    const params = {
      title: title,
      points: points,
      flag: flag,
      description: description,
      category: category
    };
    return this.http.post(`${config.apiUrl}/challenge/`, params, ChallengeService.getHttpOptions())
  }

}
