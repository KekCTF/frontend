import {User} from './User';

export class Session {
  private _id: string;

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  private _user: User;

  get user(): User {
    return this._user;
  }

  set user(value: User) {
    this._user = value;
  }

  private _created: Date;

  get created(): Date {
    return this._created;
  }

  set created(value: Date) {
    this._created = value;
  }

  private _expirationDate: Date;

  get expirationDate(): Date {
    return this._expirationDate;
  }

  set expirationDate(value: Date) {
    this._expirationDate = value;
  }
}
