import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { BroadcastService, MsalService } from '@azure/msal-angular';
import { NavigationService } from 'src/app/core/services/navigation-service/navigation.service';
import { UserStore } from 'src/app/core/stores/user.store';
import { AccountStore } from 'src/app/core/stores/account.store';
import { User } from 'msal';
import { Account } from '../../core/entities/account';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, OnDestroy {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
  userStoreSub: Subscription;
  accountStoreSub: Subscription;
  account: Account;
  loginFailSub: Subscription;
  loginSuccessSub: Subscription;

  public constructor(
    private titleService: Title,
    public navigationService: NavigationService,
    private breakpointObserver: BreakpointObserver,
    private broadcastService: BroadcastService,
    public userStore: UserStore,
    public accountStore: AccountStore,
    private authService: MsalService) {
    titleService.setTitle(this.title);

    const user = this.authService.getUser();
    this.userStore.setState(user);

    if (user) {
      this.loggedIn = true;

    } else {
      this.loggedIn = false;
    }
  }
  title = 'Allowance';
  loggedIn: boolean;

  public userName: string;

  private subscription: Subscription;
  public data: string;

  onLogin() {
    this.authService.loginPopup();
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnInit() {
    this.userStoreSub = this.userStore.state$.subscribe(u => this.userName = u.name);
    this.accountStoreSub = this.accountStore.state$.subscribe(account => this.account = account);
    this.loginFailSub = this.broadcastService.subscribe('msal:loginFailure', this.loginFail());
    this.loginSuccessSub = this.broadcastService.subscribe('msal:loginSuccess', this.loginSuccess());

    const user = this.authService.getUser();
    if (user) {
      this.loggedIn = true;
      this.setUser(user);
    }

  }
  private loginFail() {
    return payload => {
      console.log('login failure ' + JSON.stringify(payload));
      this.loggedIn = false;
    };
  }

  private loginSuccess() {
    return payload => {
      const user = this.authService.getUser();
      this.setUser(user);
      console.log('login success ' + JSON.stringify(payload));
      this.loggedIn = true;
    };
  }

  setUser(user: User) {
    this.userStore.setState(user);
    this.accountStore.load(user.displayableId);
  }
  ngOnDestroy() {
    this.broadcastService.getMSALSubject().next(1);


    if (this.userStoreSub) {
      this.userStoreSub.unsubscribe();
    }
    if (this.accountStoreSub) {
      this.accountStoreSub.unsubscribe();
    }
    if (this.loginFailSub) {
      this.loginFailSub.unsubscribe();
    }
    if (this.loginSuccessSub) {
      this.loginSuccessSub.unsubscribe();
    }
  }
}
