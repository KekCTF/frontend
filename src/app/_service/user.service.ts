import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {config} from '../config';
import {User} from '../_model/User';
import {Session} from '../_model/Session';
import {CookieService} from 'ngx-cookie-service';

@Injectable()
export class UserService {

  constructor(private http: HttpClient,
              private cookieService: CookieService) {
  }

  login(username: string, password: string, code: string) {
    const params = {
      username,
      password,
      code
    };
    return this.http.post<Session>(`${config.apiUrl}/authentication-service/auth/login`, params);
  }

  logout(userId: string = JSON.parse(localStorage.getItem('session')).user.id) {
    const params = {
      userId
    };
    return this.http.post(`${config.apiUrl}/user/logout`, params, this.getHttpOptions());
  }

  register(username: string, password: string, team: string) {
    const params = {
      username,
      password,
      team
    };
    return this.http.post(`${config.apiUrl}/authentication-service/auth/signup`, params);
  }

  get(id: string) {
    return this.http.get<User>(`${config.apiUrl}/user-service/${id}`, this.getHttpOptions());
  }

  getAll() {
    return this.http.get<User[]>(`${config.apiUrl}/user-service/`, this.getHttpOptions());
  }

  delete(id: string) {
    return this.http.delete(`${config.apiUrl}/user-service/${id}`, this.getHttpOptions());
  }

  update(id: string, username: string, password: string, team: string) {
    const params = {
      username,
      password,
      team
    };
    return this.http.put(`${config.apiUrl}/user-service/${id}`, params, this.getHttpOptions());
  }

  promote(id: string) {
    const params = {};
    return this.http.patch(`${config.apiUrl}/user-service/promote/${id}`, params, this.getHttpOptions());
  }

  private getHttpOptions(responseType: string = 'json') {
    const token = this.cookieService.get('token');
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      })
    };
  }
}
