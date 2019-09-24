import { Injectable } from '@angular/core';
import { User } from 'msal';
import { Store } from '../types/store';
import { BehaviorSubject, Subscription } from 'rxjs';

@Injectable()
export class UserStore extends Store<User> {
  private _loggedIn$ = new BehaviorSubject<boolean>(false);
  private loggedInSubscription: Subscription;

  constructor() {
    super(null);
    this.loggedInSubscription = this.state$.subscribe(user => this.loggedIn$.next(user != null));
  }
  get loggedIn$(): BehaviorSubject<boolean> {
    return this._loggedIn$;
  }
}
