import {User} from './User';

export class Challenge {
  private _users: User[];

  get users(): User[] {
    return this._users;
  }

  set users(value: User[]) {
    this._users = value;
  }

  private _id: string;

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  private _title: string;

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  private _description: string;

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  private _points: number;

  get points(): number {
    return this._points;
  }

  set points(value: number) {
    this._points = value;
  }

  private _category: string;

  get category(): string {
    return this._category;
  }

  set category(value: string) {
    this._category = value;
  }
}
