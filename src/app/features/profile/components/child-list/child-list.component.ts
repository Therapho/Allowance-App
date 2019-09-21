import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Account} from 'src/app/core/entities/account';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { TransactionDialogComponent } from '../transaction-dialog/transaction-dialog.component';
import { Transaction } from '../../types/transaction';


@Component({
  selector: 'app-child-list',
  templateUrl: './child-list.component.html',
  styleUrls: ['./child-list.component.scss']
})
export class ChildListComponent implements OnInit {
  @Input() childList: Account[];
  @Output() updateBalance: EventEmitter<Transaction> = new EventEmitter();
  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit() {


  }
  public async deposit(accountId: number) {
    this.requestTransaction('Deposit').then(transaction => {
      transaction.accountId = accountId;
      this.updateBalance.emit(transaction);
    });

  }

  public withdraw(accountId: number) {
    this.requestTransaction('Withdraw').then(transaction => {
      transaction.accountId = accountId;
      this.updateBalance.emit(transaction);
    });
  }

  async requestTransaction(category: string): Promise<Transaction> {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
        category
    };

    const dialogRef = this.dialog.open<TransactionDialogComponent, Transaction>(TransactionDialogComponent, dialogConfig);
    return dialogRef.afterClosed().toPromise<Transaction>();
  }
}
