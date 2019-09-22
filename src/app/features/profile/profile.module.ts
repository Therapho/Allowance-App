import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileViewComponent } from './views/profile-view/profile-view.component';
import { SharedModule } from '../../shared/shared.module';
import { ChildListComponent } from './components/child-list/child-list.component';
import { TransactionDialogComponent } from './components/transaction-dialog/transaction-dialog.component';
import { LogViewComponent } from './views/log-view/log-view.component';
import { TransactionLogStore } from './stores/transaction-log.store';

@NgModule({
  declarations: [ProfileViewComponent, ChildListComponent, TransactionDialogComponent, LogViewComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule,
  ],
  entryComponents: [TransactionDialogComponent],
  providers: [TransactionLogStore]
})
export class ProfileModule { }
