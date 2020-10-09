import {User} from './User';

export class Challenge {
  private _id: string;
  private _title: string;
  private _description: string;
  private _category: string;
  private _fileURL: string;
  private _solved: boolean;
  private _points: number;


  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get category(): string {
    return this._category;
  }

  set category(value: string) {
    this._category = value;
  }

  get fileURL(): string {
    return this._fileURL;
  }

  set fileURL(value: string) {
    this._fileURL = value;
  }

  get solved(): boolean {
    return this._solved;
  }

  set solved(value: boolean) {
    this._solved = value;
  }

  get points(): number {
    return this._points;
  }

  set points(value: number) {
    this._points = value;
  }
}
