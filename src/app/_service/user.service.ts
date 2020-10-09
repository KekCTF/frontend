import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {config} from '../config';
import {User} from '../_model/User';
import {Session} from '../_model/Session';
import {CookieService} from 'ngx-cookie-service';

@Injectable()
export class UserService {

  constructor(private http: HttpClient, private cookieService: CookieService) {
  }

  login(username: string, password: string, code: string) {
    const params = {
      username: username,
      password: password,
      code: code
    };
    return this.http.post<Session>(`${config.apiUrl}/authentication-service/auth/login`, params);
  }

  logout(userId: string = JSON.parse(localStorage.getItem('session')).user.id) {
    const params = {
      userId: userId
    };
    return this.http.post(`${config.apiUrl}/user/logout`, params, this.getHttpOptions());
  }

  register(username: string, password: string, team: string) {
    const params = {
      username: username,
      password: password,
      team: team
    };
    return this.http.post(`${config.apiUrl}/authentication-service/auth/signup`, params);
  }

  get(id: string) {
    // TODO
    return this.http.get<User>(`${config.apiUrl}/user/${id}`, this.getHttpOptions());
  }

  getAll() {
    // TODO
    return this.http.get<User[]>(`${config.apiUrl}/user/`, this.getHttpOptions());
  }

  delete(id: string) {
    // TODO
    return this.http.delete(`${config.apiUrl}/user/${id}`, this.getHttpOptions());
  }

  update(id: string, username: string, password: string) {
    // TODO
    let params = {
      username: username,
      password: password
    };
    return this.http.put(`${config.apiUrl}/user/${id}`, params, this.getHttpOptions());
  }

  promote(id: string) {
    // TODO
    let params = {};
    return this.http.patch(`${config.apiUrl}/user/promote/${id}`, params, this.getHttpOptions());
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
