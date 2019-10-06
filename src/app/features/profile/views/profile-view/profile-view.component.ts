import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserStore } from 'src/app/core/stores/user.store';
import { AccountStore } from 'src/app/core/stores/account.store';
import { LookupStore } from 'src/app/core/stores/lookup.store';
import { Constants } from 'src/app/core/common/constants';
import { Account } from 'src/app/core/entities/account';
import { Transaction } from '../../types/transaction';
import { Subscription } from 'rxjs';
import { MessageService } from 'src/app/core/services/message-service/message.service';
import { formatCurrency } from '@angular/common';

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
    public lookupStore: LookupStore,
    private messageService: MessageService,
  ) {}

  ngOnInit() {
    this.accountListSubscription = this.accountStore.accountList$.subscribe(
      accountList => {
        this.childList = accountList.filter(
          account => account.roleId === Constants.Role.Child
        );
      }
    );
  }

  updateBalance(transaction: Transaction) {
    this.accountStore
      .updateBalance(transaction)
      .then(() => {
        const category = this.lookupStore.getName(transaction.categoryId, 'TransactionLogCategory');
        const account = this.accountStore.getAccountById(transaction.accountId).name;
        const amount = formatCurrency(transaction.amount, 'en-ca', '$', 'cad');

        this.messageService.addInfo('Balance Updated', category + ' of ' + amount + ' to ' + account + ' complete.');
        this.accountStore.refreshAccountList().catch(error => {
          this.messageService.addError(
            'Error refreshing account list.',
            error.message
          );
        });
      })
      .catch(error => {
        this.messageService.addError(
          'Error updating balance.',
          error.message
        );
      });
  }
  ngOnDestroy() {
    if (this.accountListSubscription != null) {
      this.accountListSubscription.unsubscribe();
    }
  }
}
