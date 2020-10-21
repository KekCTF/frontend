import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../_model/User';
import {Session} from '../_model/Session';
import {CookieService} from 'ngx-cookie-service';
import {environment} from '../../environments/environment';

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
    return this.http.post<Session>(`${environment.apiUrl}/authentication-service/auth/login`, params);
  }

  logout(userId: string = JSON.parse(localStorage.getItem('session')).user.id) {
    const params = {
      userId
    };
    return this.http.post(`${environment.apiUrl}/user/logout`, params, this.getHttpOptions());
  }

  register(username: string, password: string, team: string) {
    const params = {
      username,
      password,
      team
    };
    return this.http.post(`${environment.apiUrl}/authentication-service/auth/signup`, params);
  }

  get(id: string) {
    return this.http.get<User>(`${environment.apiUrl}/user-service/${id}`, this.getHttpOptions());
  }

  getAll() {
    return this.http.get<User[]>(`${environment.apiUrl}/user-service/`, this.getHttpOptions());
  }

  delete(id: string) {
    return this.http.delete(`${environment.apiUrl}/user-service/${id}`, this.getHttpOptions());
  }

  update(id: string, username: string, password: string, team: string) {
    const params = {
      username,
      password,
      team
    };
    return this.http.put(`${environment.apiUrl}/user-service/${id}`, params, this.getHttpOptions());
  }

  promote(id: string) {
    const params = {};
    return this.http.patch(`${environment.apiUrl}/user-service/promote/${id}`, params, this.getHttpOptions());
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
