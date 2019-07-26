import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoneyRoutingModule } from './money-routing.module';
import { MoneyViewComponent } from './components/money-view/money-view.component';
import { MaterialModule } from '../../shared/modules/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LogViewComponent } from './components/log-view/log-view.component';


@NgModule({
  declarations: [MoneyViewComponent, LogViewComponent],
  imports: [
    CommonModule,
    MoneyRoutingModule,
    MaterialModule,
    FlexLayoutModule
  ]
})
export class MoneyModule { }
