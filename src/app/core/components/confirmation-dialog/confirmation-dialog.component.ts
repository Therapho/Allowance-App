import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {
  message: string;

  constructor(
    private dialogRef: MatDialogRef<ConfirmationDialogComponent>,  @Inject(MAT_DIALOG_DATA) data) {

    this.message = data.message;
  }

  ngOnInit() {
  }
  public yes() {
    this.dialogRef.close(true);
  }
  public no() {
    this.dialogRef.close(false);
  }
}
