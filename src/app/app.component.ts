import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserStore } from './core/stores/user.store';
import { AccountStore } from './core/stores/account.store';
import { Account } from 'msal';
import { AuthenticationService } from './core/services/authentication-service/authentication.service';
import { MessageService } from './core/services/message-service/message.service';

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
    private authenticationService: AuthenticationService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.loginSubscription = this.authenticationService.loginResponse$.subscribe(u => {
      this.setupSession(u);
    });

    const user = this.authenticationService.getAccount();
    this.setupSession(user);
  }
  public onLogin() {
    this.authenticationService.login();
  }
  public onLogout() {
    this.authenticationService.logout();
  }

  private async setupSession(user: Account) {
    this.userStore.setState(user);
    let exp = null;

    if (user != null) {
      // tslint:disable-next-line: no-string-literal
      exp = user.idToken['exp'];
    }
    if (exp == null || exp < Date.now().valueOf() / 1000) {
      this.authenticationService.login();
    } else {
      // tslint:disable-next-line: no-string-literal
      const userIdentifier = user.idToken['sub'];
      this.accountStore.load(userIdentifier)
        .then()
        .catch(error => {

          this.messageService.addError('Error retrieving account for logged in user with identifier ' + userIdentifier, error);
        });
    }
  }

  ngOnDestroy() {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }
}
