import { NgModule } from '@angular/core';
import { LayoutModule } from '@angular/cdk/layout';
import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatCardModule,
  MatExpansionModule,
  MatTableModule,
  MatSlideToggleModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { LookupFilterPipe } from '../core/pipes/lookup-filter.pipe';
import { AccountFilterPipe } from '../core/pipes/account-filter.pipe';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LookupFilterPipe, AccountFilterPipe],
  imports: [
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatExpansionModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    LayoutModule,
    MatCheckboxModule,
    MatTableModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatExpansionModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    LayoutModule,
    MatCheckboxModule,
    LookupFilterPipe,
    MatTableModule,
    MatSlideToggleModule,
    MatDialogModule,
    AccountFilterPipe,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class SharedModule {}
