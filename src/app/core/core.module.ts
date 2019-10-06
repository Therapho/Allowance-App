import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { MatDialogModule } from '@angular/material';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ConfirmationDialogComponent
  ],
  imports: [CommonModule, MatDialogModule, SharedModule],

  entryComponents: [ConfirmationDialogComponent]
})
export class CoreModule {}
