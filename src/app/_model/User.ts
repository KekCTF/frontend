import {Challenge} from './Challenge';

export class User {
  private _id: string;

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  private _username: string;

  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }

  private _points: number;

  get points(): number {
    return this._points;
  }

  set points(value: number) {
    this._points = value;
  }

  private _challenges: Challenge[];

  get challenges(): Challenge[] {
    return this._challenges;
  }

  set challenges(value: Challenge[]) {
    this._challenges = value;
  }

  private _role: string;

  get role(): string {
    return this._role;
  }

  set role(value: string) {
    this._role = value;
  }

  private _lastSubmit: Date;

  get lastSubmit(): Date {
    return this._lastSubmit;
  }

  set lastSubmit(value: Date) {
    this._lastSubmit = value;
  }
}
