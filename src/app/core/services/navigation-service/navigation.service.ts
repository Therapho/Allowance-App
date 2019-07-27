import { Injectable } from '@angular/core';
import { NavigationGroup } from './navigation.group';
@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private _top: NavigationGroup = new NavigationGroup();

  private _left: NavigationGroup = new NavigationGroup();

  get top() { return this._top; }
  get left() { return this._left; }
}
