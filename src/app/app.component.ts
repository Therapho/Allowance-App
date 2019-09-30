import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserStore } from './core/stores/user.store';
import { AccountStore } from './core/stores/account.store';
import { User } from 'msal';
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
    localStorage.clear();
    this.authenticationService.logout();
  }

  private async setupLogin(user: User) {

    // tslint:disable-next-line: no-string-literal
    const userIdentifier = user.idToken['sub'];
    this.userStore.setState(user);
    this.accountStore.load(userIdentifier)
      .catch(error => {
        this.messageService.addError('Error retrieving account for logged in user.', error.message);
      });

  }
  ngOnDestroy() {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }
}
