import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserStore } from 'src/app/core/stores/user.store';
import { AccountStore } from 'src/app/core/stores/account.store';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  userSubscription: Subscription;

  constructor(
    private userStore: UserStore,
    private accountStore: AccountStore,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.userSubscription = this.userStore.loggedIn$.subscribe(state => {
      if (state === true) {
        if (this.accountStore.isParent) {
          this.router.navigate(['profile']);
        } else {
          this.router.navigate(['tasks']);
        }

      }
    });
  }
ngOnDestroy() {

}
}
