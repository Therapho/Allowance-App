import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Subscription, Observable, BehaviorSubject } from 'rxjs';
import { UserStore } from '../../stores/user.store';
import { AccountStore } from '../../stores/account.store';
import { MsalService, BroadcastService } from '@azure/msal-angular';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { User } from 'msal';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements  OnDestroy {
  loginFailSub: Subscription;
  loginSuccessSub: Subscription;
  private loginResponse = new BehaviorSubject<User>(null);

  private subscription: Subscription;
  public data: string;
  constructor(

    private authService: MsalService,
    private broadcastService: BroadcastService,

  ) {

    this.loginFailSub = this.broadcastService.subscribe(
      'msal:loginFailure',
      this.loginFail()
    );
    this.loginSuccessSub = this.broadcastService.subscribe(
      'msal:loginSuccess',
      this.loginSuccess()
    );


  }

  public login(): Observable<User> {
    this.authService.loginPopup();
    return this.loginResponse.asObservable();
  }

  public logout() {
    this.authService.logout();
    // this.router.navigate(['']);
  }


  private loginFail() {
    return payload => {
      console.log('login failure ' + JSON.stringify(payload));
    };
  }

  private loginSuccess() {
    return async payload => {
      const user = this.authService.getUser();
      this.loginResponse.next(user);
      console.log('login success ' + JSON.stringify(payload));
      this.authService
      .acquireTokenSilent(environment.contentScopes)
      .then(token => localStorage.setItem('access_token', token))
      .catch(reason =>
        this.authService
          .acquireTokenPopup(environment.contentScopes)
          .then(token => localStorage.setItem('access_token', token))
      );
    };
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
