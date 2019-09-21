import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Transaction } from '../../types/transaction';
import { Constants } from 'src/app/core/common/constants';

@Component({
  selector: 'app-transaction-dialog',
  templateUrl: './transaction-dialog.component.html',
  styleUrls: ['./transaction-dialog.component.scss']
})
export class TransactionDialogComponent implements OnInit {
  category: string;
  form: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<TransactionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private formBuilder: FormBuilder
  ) {
    this.category = data.category;
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      description: [ ''],
      amount: [0]
    });
  }

  public ok() {
    let categoryId = 0;

    if (this.category === 'Deposit') {
      categoryId = Constants.TransactionCategory.Deposit;
    } else {
      categoryId = Constants.TransactionCategory.Withdrawal;
    }
    const transaction: Transaction = {
        description: this.form.value.description,
        amount: +this.form.value.amount,
        categoryId
    };
    this.dialogRef.close(transaction);
  }
  public cancel() {
    this.dialogRef.close(null);
  }
}
