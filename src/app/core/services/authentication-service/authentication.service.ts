import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Subscription, Observable, BehaviorSubject, Subject } from 'rxjs';

import { environment } from 'src/environments/environment';
import { UserAgentApplication, Configuration, CacheLocation, AuthError, AuthResponse, Account } from 'msal';
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
    var msalConfig: Configuration = {
      auth:{
        clientId: environment.clientId,
        authority: environment.authority,
        validateAuthority: environment.validateAthority,
        redirectUri: environment.redirectUri,
        navigateToLoginRequestUrl: true
      },
      cache:{
        cacheLocation: environment.cacheLocation as CacheLocation

      },
      system:{

      },
      framework:{
        protectedResourceMap:  environment.protectedResourceMap
        
      }
    }
    this.agent = new UserAgentApplication(msalConfig);
  }

  authCallback(authErr: AuthError, response?: AuthResponse) {
    const token = response.idToken.rawIdToken;
     localStorage.setItem('AccessToken', token);
     this.getAccessToken().then(() => {
          const account = this.agent.getAccount();
          this.loginResponse.next(account);
     });
  }

  public login(): Observable<Account> {
    const loginRequest = { scopes: environment.contentScopes };
    this.agent.handleRedirectCallback(this.authCallback);
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
    this.router.navigate(['']);
  }

  public getAccount(): Account {
    let account = this.agent.getAccount();
    if (!this.isValid(account)) {
      account = null;
    }

    return account;
  }

  isValid(account: Account): boolean {
    if (!account) { return false; }
    // tslint:disable-next-line: no-string-literal
    //if (account.idToken['exp'] > Date.now()) { return false; }
    return true;
  }
  public getAccessToken(): Promise<string> {
    const tokenRequest = { scopes: environment.contentScopes };
    return new Promise<string>((resolve, reject) => {
      this.agent
      .acquireTokenSilent(tokenRequest)
      .then(response => {
        const token = response.accessToken;
        resolve(token);})
      .catch(reason => {
        this.loginResponse.next(null);
        reject(reason);
      });
    });
  }
}
