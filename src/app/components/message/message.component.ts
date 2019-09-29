import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MessageService } from 'src/app/core/services/message-service/message.service';
import { Constants } from 'src/app/core/common/constants';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material';


@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit, OnDestroy {
  typeSubscription: Subscription;
  public messageIcon: string;

  constructor(
    public messageService: MessageService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.typeSubscription = this.messageService.maxType$.subscribe(type => {
      switch (type) {
        case Constants.MessageType.Information:
          this.messageIcon = 'info';
          break;
        case Constants.MessageType.Warning:
          this.messageIcon = 'warning';
          break;
        case Constants.MessageType.Error:
          this.messageIcon = 'error';
          break;
        default:
          this.messageIcon = '';
          break;
      }
    });
  }
  showDetails() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open<MessageDialogComponent>(MessageDialogComponent, dialogConfig);
    return dialogRef.afterClosed().toPromise();
  }
  ngOnDestroy() {
    if (this.typeSubscription) {
      this.typeSubscription.unsubscribe();
    }
  }
}
