import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserStore } from './core/stores/user.store';
import { AccountStore } from './core/stores/account.store';
import { User } from 'msal';
import { AuthenticationService } from './core/services/authentication-service/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  loginSubscription: Subscription;
  constructor(
    public userStore: UserStore,
    public accountStore: AccountStore,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    const user = this.authenticationService.getUser();
    if (user) {
      this.setupLogin(user);
    }
  }
  public onLogin() {
    this.loginSubscription = this.authenticationService.login().subscribe(user => {
      this.setupLogin(user);
    });
  }
  public onLogout() {
    this.authenticationService.logout();
  }

  private async setupLogin(user: User) {

    // tslint:disable-next-line: no-string-literal
    const userIdentifier = user.idToken['sub'];
    this.userStore.setState(user);
    this.accountStore.load(userIdentifier);

  }
  ngOnDestroy() {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }
}
