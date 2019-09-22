import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionLogStore } from '../../stores/transaction-log.store';
import { AccountStore } from 'src/app/core/stores/account.store';
import { LookupStore } from 'src/app/core/stores/lookup.store';

@Component({
  selector: 'app-log-view',
  templateUrl: './log-view.component.html',
  styleUrls: ['./log-view.component.scss']
})
export class LogViewComponent implements OnInit {
  routeSubscription: Subscription;
  selectedAccountId: number;
  displayedColumns: string[] = ['date', 'categoryId', 'amount', 'description', 'userIdentifier'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public transactionLogStore: TransactionLogStore,
    public accountStore: AccountStore,
    public lookupStore: LookupStore
  ) {}

  ngOnInit() {

      this.routeSubscription = this.route.paramMap.subscribe(params => {
        this.selectedAccountId = +params.get('accountid');
        this.transactionLogStore.load(this.selectedAccountId);
    });
  }
}
