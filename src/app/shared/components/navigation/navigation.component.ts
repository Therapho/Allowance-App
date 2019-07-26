import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { BroadcastService, MsalService } from '@azure/msal-angular';


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

  public constructor(
    private titleService: Title,
    private breakpointObserver: BreakpointObserver,
    private broadcastService: BroadcastService,
    private authService: MsalService) {
    titleService.setTitle(this.title);
    if (this.authService.getUser()) {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }
  }
  title = 'Allowance';
  loggedIn: boolean;

  public userInfo: any = null;

  private subscription: Subscription;
  private storeSubscription: Subscription;
  public data: string;

  onLogin() {
    this.authService.loginPopup();
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnInit() {
    this.broadcastService.subscribe('msal:loginFailure', payload => {
      console.log('login failure ' + JSON.stringify(payload));

      this.loggedIn = false;
    });

    this.broadcastService.subscribe('msal:loginSuccess', payload => {
      const user = this.authService.getUser();
      console.log('login success ' + JSON.stringify(payload));

      this.loggedIn = true;
    });
  }

  ngOnDestroy() {
    this.broadcastService.getMSALSubject().next(1);

    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
