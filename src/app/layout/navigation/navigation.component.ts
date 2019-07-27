import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { BroadcastService, MsalService } from '@azure/msal-angular';
import { NavigationService } from 'src/app/core/services/navigation-service/navigation.service';
import { UserStore } from 'src/app/core/services/user-store/user-store';


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
  userStoreSub: Subscription;

  public constructor(
    private titleService: Title,
    public navigationService: NavigationService,
    private breakpointObserver: BreakpointObserver,
    private broadcastService: BroadcastService,
    public userStore: UserStore,
    private authService: MsalService) {
    titleService.setTitle(this.title);

    const user = this.authService.getUser();
    this.userStore.setState(user);

    if (user) {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }
  }
  title = 'Allowance';
  loggedIn: boolean;

  public userName: string;

  private subscription: Subscription;
  public data: string;

  onLogin() {
    this.authService.loginPopup();
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnInit() {
    this.userStoreSub = this.userStore.state$.subscribe(user => this.userName = user.name);
    this.broadcastService.subscribe('msal:loginFailure', payload => {
      console.log('login failure ' + JSON.stringify(payload));

      this.loggedIn = false;
    });

    this.broadcastService.subscribe('msal:loginSuccess', payload => {

      const user = this.authService.getUser();
      this.userStore.setState(user);

      console.log('login success ' + JSON.stringify(payload));

      this.loggedIn = true;
    });
  }

  ngOnDestroy() {
    this.broadcastService.getMSALSubject().next(1);

    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.userStoreSub) {
      this.userStoreSub.unsubscribe();
    }
  }
}
