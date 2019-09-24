import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserStore } from './core/stores/user.store';
import { AccountStore } from './core/stores/account.store';
import { MsalService, BroadcastService } from '@azure/msal-angular';
import { User } from 'msal';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  loginFailSub: Subscription;
  loginSuccessSub: Subscription;

  private subscription: Subscription;
  public data: string;
  constructor(
    public userStore: UserStore,
    public accountStore: AccountStore,
    private authService: MsalService,
    private broadcastService: BroadcastService,
    private router: Router
  ) {
    const user = this.authService.getUser();
    this.userStore.setState(user);
  }

  onLogin() {
    this.authService.loginPopup();
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['']);
  }

  ngOnInit() {
    this.loginFailSub = this.broadcastService.subscribe(
      'msal:loginFailure',
      this.loginFail()
    );
    this.loginSuccessSub = this.broadcastService.subscribe(
      'msal:loginSuccess',
      this.loginSuccess()
    );

    const user = this.authService.getUser();
    if (user) {
      this.setupLogin(user);
    }
  }
  private loginFail() {
    return payload => {
      console.log('login failure ' + JSON.stringify(payload));
    };
  }

  private loginSuccess() {
    return async payload => {
      const user = this.authService.getUser();
      console.log('login success ' + JSON.stringify(payload));

      await this.setupLogin(user);
    };
  }

  private async setupLogin(user: User) {
    // tslint:disable-next-line: no-string-literal - Dynamics property
    const userName = user.idToken['emails'][0];
    // tslint:disable-next-line: no-string-literal
    const userIdentifier = user.idToken['sub'];
    this.userStore.setState(user);
    this.accountStore.load(userIdentifier);
    if (environment.secureApi) {
      this.authService
        .acquireTokenSilent(environment.contentScopes)
        .then(token => localStorage.setItem('access_token', token))
        .catch(reason =>
          this.authService
            .acquireTokenPopup(environment.contentScopes)
            .then(token => localStorage.setItem('access_token', token))
        );
    }
  }
  ngOnDestroy() {
    this.broadcastService.getMSALSubject().next(1);
    if (this.loginFailSub) {
      this.loginFailSub.unsubscribe();
    }
    if (this.loginSuccessSub) {
      this.loginSuccessSub.unsubscribe();
    }
  }
}
