import {Challenge} from './Challenge';

export class Team {
  private _id: string;
  private _name: string;
  private _challenges: Challenge[];
  private _points: number;


  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get challenges(): Challenge[] {
    return this._challenges;
  }

  set challenges(value: Challenge[]) {
    this._challenges = value;
  }

  get points(): number {
    return this._points;
  }

  set points(value: number) {
    this._points = value;
  }
}
