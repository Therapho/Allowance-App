import { Injectable } from '@angular/core';
import { User } from 'msal';
import { Store } from '../store/store';

@Injectable()
export class UserStore extends Store<User> {
  constructor() {
    super(null);
  }
}
