import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Subscription, Observable, BehaviorSubject, Subject } from 'rxjs';

import { environment } from 'src/environments/environment';
import { UserAgentApplication, CacheLocation, Configuration, AuthError, AuthResponse, Account} from 'msal';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


  loginFailSub: Subscription;
  loginSuccessSub: Subscription;
  private loginResponse = new Subject<Account>();
  private agent: UserAgentApplication;
  public loginResponse$ = this.loginResponse.asObservable();
  public data: string;


  constructor(
    private router: Router
  ) {
    const msalConfig: Configuration = {
      auth: {
        clientId: environment.clientId,
        authority: environment.authority,
        validateAuthority: environment.validateAthority,
        redirectUri: environment.redirectUri,
        navigateToLoginRequestUrl: true
      },
      cache: {
        cacheLocation: environment.cacheLocation as CacheLocation,
        storeAuthStateInCookie: environment.storeAuthStateInCookie

      },
      system: {

      },
      framework: {
        protectedResourceMap:  environment.protectedResourceMap

      }
    };
    this.agent = new UserAgentApplication(msalConfig);
    this.agent.handleRedirectCallback((error, response) => {});

  }


  public login(): Observable<Account> {
    const loginRequest = { scopes: environment.contentScopes };

    this.agent.loginRedirect(loginRequest);
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
    // this.router.navigate(['']);
  }

  public getAccount(): Account {
    const account = this.agent.getAccount();
    // if (!this.isValid(account)) {
    //   account = null;
    // }

    return account;
  }


  public getAccessToken(): Promise<string> {
    const tokenRequest = { scopes: environment.contentScopes };
    return new Promise<string>((resolve, reject) => {
      this.agent
      .acquireTokenSilent(tokenRequest)
      .then(response => {
        const token = response.accessToken;
        resolve(token); })
      .catch(reason => {
        this.loginResponse.next(null);
        reject(reason);
      });
    });
  }
}
