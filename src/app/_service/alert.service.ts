import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class AlertService {
  private subject = new Subject<any>();
  private keepAfterNavigationChange = false;

  constructor(private router: Router) {
    // clear alert message on route change
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterNavigationChange) {
          // only keep for a single location change
          this.keepAfterNavigationChange = false;
        } else {
          // clear alert
          this.subject.next();
        }
      }
    });
  }

  // success(error: any, keepAfterNavigationChange = false, timeoutTime = 5000) {
  //   const errorString = `${error.status} - ${error.status === 0 ? 'The api is offline' : error.error}`;
  //   this.success(errorString, keepAfterNavigationChange, timeoutTime);
  // }

  success(message: string, keepAfterNavigationChange = false, timeoutTime = 5000) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.autoRemoveAfter(timeoutTime);
    this.subject.next({ type: 'success', text: message });
  }

  // error(error: any, keepAfterNavigationChange = false, timeoutTime = 5000) {
  //   const errorString = `${error.status} - ${error.status === 0 ? 'The api is offline' : error.error}`;
  //   this.error(errorString, this.keepAfterNavigationChange, timeoutTime)
  // }

  error(message: string, keepAfterNavigationChange = false, timeoutTime = 5000) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.autoRemoveAfter(timeoutTime);
    this.subject.next({ type: 'error', text: message});
  }

  private autoRemoveAfter(time) {
    setTimeout(() => {
      this.subject.next();
    }, time);
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}
