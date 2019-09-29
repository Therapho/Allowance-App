import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { MessageService } from 'src/app/core/services/message-service/message.service';

@Component({
  selector: 'app-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.scss']
})
export class MessageDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<MessageDialogComponent>,
    public messageService: MessageService
  ) { }

  ngOnInit() {
  }
  public remove(index) {
    this.messageService.removeMessage(index);
  }
  public clear() {
    this.messageService.clear();
  }
  public close() {
    this.dialogRef.close();
  }
}
