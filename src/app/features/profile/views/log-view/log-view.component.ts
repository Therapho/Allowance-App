import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionLogStore } from '../../stores/transaction-log.store';
import { AccountStore } from 'src/app/core/stores/account.store';
import { LookupStore } from 'src/app/core/stores/lookup.store';
import { MessageService } from 'src/app/core/services/message-service/message.service';

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
    public lookupStore: LookupStore,
    public messageService: MessageService
  ) {}

  ngOnInit() {

      this.routeSubscription = this.route.paramMap.subscribe(params => {
        this.selectedAccountId = +params.get('accountid');
        this.transactionLogStore.load(this.selectedAccountId).catch(error => {
          this.messageService.addError('Error retrieving transaction log data.', error.message);
        });
    });
  }
}
