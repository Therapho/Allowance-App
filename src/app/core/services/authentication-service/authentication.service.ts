import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Subscription, Observable, BehaviorSubject, Subject } from 'rxjs';

import { environment } from 'src/environments/environment';
import { User, UserAgentApplication } from 'msal';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService  {


  loginFailSub: Subscription;
  loginSuccessSub: Subscription;
  private loginResponse = new Subject<User>();
  private agent: UserAgentApplication;
  public data: string;
  msalConfig: { auth: { clientId: string; authority: string; }; cache: { cacheLocation: string; storeAuthStateInCookie: boolean; }; };

  constructor(

  ) {


    const msalConfig = {
      auth: {
          clientId: environment.clientId,
          authority: environment.authority
      },
      cache: {
          cacheLocation: environment.cacheLocation,
          storeAuthStateInCookie: true
      }
  };
    this.agent = new UserAgentApplication(environment.clientId, environment.authority, null, {
      validateAuthority: environment.validateAthority,
      cacheLocation: environment.cacheLocation,
      protectedResourceMap: environment.protectedResourceMap
    });


  }

  public login(): Observable<User> {

    this.agent.loginPopup(environment.contentScopes).then(idToken => {
      this.loginSuccess(idToken);
  }).catch(error => {
      this.loginResponse.error(error);
  });
    return this.loginResponse.asObservable();
  }

  public logout() {
    this.agent.logout();
    // this.router.navigate(['']);
  }

  public getUser(): User {
    const user = this.agent.getUser();
    if (user) {
      this.cacheAccessToken();
    }

    return user;
  }
  private cacheAccessToken() {

      this.agent
      .acquireTokenSilent(environment.contentScopes)
      .then(accessToken => localStorage.setItem('accessToken', accessToken))
      .catch(reason =>
        this.agent
          .acquireTokenPopup(environment.contentScopes)
          .then(accessToken => localStorage.setItem('accessToken', accessToken))
      );

  }
  private loginSuccess(idToken) {
      console.log('Login token received: ' + idToken);

      const user = this.agent.getUser();
      this.loginResponse.next(user);
      this.cacheAccessToken();


  }
  getAuthToken(): string {
    const token = localStorage.getItem('accessToken');
    return token;
  }


}
