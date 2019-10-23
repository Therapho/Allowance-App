import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Subscription, Observable, BehaviorSubject, Subject } from 'rxjs';

import { environment } from 'src/environments/environment';
import { User, UserAgentApplication } from 'msal';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


  loginFailSub: Subscription;
  loginSuccessSub: Subscription;
  private loginResponse = new Subject<User>();
  private agent: UserAgentApplication;
  public loginResponse$ = this.loginResponse.asObservable();
  public data: string;
  msalConfig: { auth: { clientId: string; authority: string; }; cache: { cacheLocation: string; storeAuthStateInCookie: boolean; }; };

  constructor(
    private router: Router
  ) {

    this.agent = new UserAgentApplication(environment.clientId, environment.authority, this.authCallback, {
      validateAuthority: environment.validateAthority,
      cacheLocation: environment.cacheLocation,
      protectedResourceMap: environment.protectedResourceMap,
      navigateToLoginRequestUrl: false
    });
  }

  authCallback(errorDesc, token, error, tokenType) {
     localStorage.setItem('AccessToken', token);
     this.getAccessToken().then(() => {
          const user = this.agent.getUser();
          this.loginResponse.next(user);
     });
  }

  public login(): Observable<User> {

    this.agent.loginRedirect(environment.contentScopes);
    // .then(() => {
    //   this.getAccessToken().then(() => {
    //     const user = this.agent.getUser();
    //     this.loginResponse.next(user);
    //   });
    // }).catch(error => {
    //   this.loginResponse.error(error);
    // });
    return this.loginResponse.asObservable();
  }

  public logout() {
    this.agent.logout();
    this.router.navigate(['']);
  }

  public getUser(): User {
    let user = this.agent.getUser();
    if (!this.isValid(user)) {
      user = null;
    }

    return user;
  }

  isValid(user: User): boolean {
    if (!user) { return false; }
    // tslint:disable-next-line: no-string-literal
    if (user.idToken['exp'] > Date.now()) { return false; }
    return true;
  }
  public getAccessToken(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.agent
      .acquireTokenSilent(environment.contentScopes)
      .then(token => resolve(token))
      .catch(reason => {
        this.loginResponse.next(null);
        reject(reason);
      });
    });
  }
}
