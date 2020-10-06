import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {config} from '../config';
import {User} from '../_model/User';
import {Session} from '../_model/Session';

@Injectable()
export class UserService {

  private static getHttpOptions(responseType: string = 'json') {
    let sessionId = JSON.parse(localStorage.getItem('session')).id;
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'sessionId': sessionId
      })
    };
  }

  constructor(private http: HttpClient) {
  }

  login(username: string, password: string) {
    const params = {
      username: username,
      password: password
    };
    return this.http.post<Session>(`${config.apiUrl}/user/login`, params);
  }

  logout(userId: string = JSON.parse(localStorage.getItem("session")).user.id) {
    const params = {
      userId: userId
    };
    return this.http.post(`${config.apiUrl}/user/logout`, params, UserService.getHttpOptions());
  }

  register(username: string, password: string) {
    const params = {
      username: username,
      password: password
    };
    return this.http.post(`${config.apiUrl}/user/`, params);
  }

  get(id: string) {
    return this.http.get<User>(`${config.apiUrl}/user/${id}`, UserService.getHttpOptions());
  }

  getAll() {
    return this.http.get<User[]>(`${config.apiUrl}/user/`, UserService.getHttpOptions());
  }

  delete(id: string) {
    return this.http.delete(`${config.apiUrl}/user/${id}`, UserService.getHttpOptions())
  }

  update(id: string, username: string, password: string) {
    let params = {
      username: username,
      password: password
    };
    return this.http.put(`${config.apiUrl}/user/${id}`, params, UserService.getHttpOptions())
  }

  promote(id: string) {
    let params = {};
    return this.http.patch(`${config.apiUrl}/user/promote/${id}`, params, UserService.getHttpOptions())
  }
}
