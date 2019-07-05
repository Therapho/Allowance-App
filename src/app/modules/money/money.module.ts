import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoneyRoutingModule } from './money-routing.module';
import { MoneyViewComponent } from './components/money-view/money-view.component';


@NgModule({
  declarations: [MoneyViewComponent],
  imports: [
    CommonModule,
    MoneyRoutingModule
  ]
})
export class MoneyModule { }
