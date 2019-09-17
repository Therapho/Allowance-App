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
  MatSlideToggleModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { LookupFilterPipe } from '../core/pipes/lookup-filter.pipe';
import { AccountFilterPipe } from '../core/pipes/account-filter.pipe';

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
    FormsModule,
    LayoutModule,
    MatCheckboxModule,
    MatTableModule,
    MatSlideToggleModule
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
    FormsModule,
    LayoutModule,
    MatCheckboxModule,
    LookupFilterPipe,
    MatTableModule,
    MatSlideToggleModule,
    AccountFilterPipe
  ]
})
export class SharedModule {}
