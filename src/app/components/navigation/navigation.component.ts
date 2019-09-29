import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter
} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { NavigationService } from 'src/app/core/services/navigation-service/navigation.service';
import { UserStore } from 'src/app/core/stores/user.store';
import { AccountStore } from 'src/app/core/stores/account.store';
import { environment } from 'src/environments/environment';
import { BusyService } from 'src/app/core/services/busy-service/busy.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  @Output() login: EventEmitter<any> = new EventEmitter();
  @Output() logout: EventEmitter<any> = new EventEmitter();
  title = environment.appTitle;



  isHandset$: Observable<boolean> = this.breakpointObserver
  .observe(Breakpoints.Handset)
  .pipe(map(result => result.matches));



  public constructor(
    private titleService: Title,
    public navigationService: NavigationService,
    private breakpointObserver: BreakpointObserver,
    public busy: BusyService,
    public userStore: UserStore,
    public accountStore: AccountStore,
  ) {
    titleService.setTitle(this.title);

  }


  onLogin() {
    this.login.emit();
  }

  onLogout() {
    this.logout.emit();
  }

}
