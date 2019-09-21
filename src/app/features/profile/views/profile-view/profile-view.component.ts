import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserStore } from 'src/app/core/stores/user.store';
import { AccountStore } from 'src/app/core/stores/account.store';
import { LookupStore } from 'src/app/core/stores/lookup.store';
import { Constants } from 'src/app/core/common/constants';
import {Account} from 'src/app/core/entities/account';
import { Transaction } from '../../types/transaction';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent implements OnInit, OnDestroy {
  public childList: Account[];
  accountListSubscription: Subscription;

  constructor(
    public userStore: UserStore,
    public accountStore: AccountStore,
    public lookupStore: LookupStore
  ) { }

  ngOnInit() {
    this.accountListSubscription = this.accountStore.accountList$.subscribe(accountList => {
      this.childList = accountList.filter(account => account.roleId === Constants.Role.Child);
    });

  }
  updateBalance(transaction: Transaction) {

    this.accountStore.updateBalance(transaction).then(() => {
      this.accountStore.refreshAccountList();
    });
  }
   ngOnDestroy() {
     if (this.accountListSubscription != null) {
       this.accountListSubscription.unsubscribe();
     }
   }
}
