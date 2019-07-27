import { NavigationLink } from '../../types/navigation-link';
import { BehaviorSubject, Observable } from 'rxjs';

export class NavigationGroup {
  private _Nav: NavigationLink[] = [];
  private _observableNav: BehaviorSubject<NavigationLink[]> = new BehaviorSubject(this._Nav);
  private _NavList: { module: string; nav: NavigationLink[] }[] = [];
  private _NavCount = 0;
  private _observableNavCount: BehaviorSubject<number> = new BehaviorSubject<number>(this._NavCount);

  get nav(): Observable<NavigationLink[]> {
    return this._observableNav.asObservable();
  }
  get count(): Observable<number> {
    return this._observableNavCount.asObservable();
  }

  setNav(module: string) {
    const NavItem = this._NavList.find(item => item.module === module);
    if (NavItem) {
      this._Nav = NavItem.nav;
    } else {
      this._Nav = [];
    }
    this._NavCount = this._Nav.length;

    this._observableNav.next(this._Nav);
    this._observableNavCount.next(this._NavCount);
  }
  addNav(value: { module: string; nav: NavigationLink[] }) {
    this._NavList.push(value);
  }
}
