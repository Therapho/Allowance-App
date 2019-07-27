import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoneyRoutingModule } from './money-routing.module';
import { MoneyViewComponent } from './views/money-view/money-view.component';
import { SharedModule } from '../../shared/shared.module';
import { LogViewComponent } from './views/log-view/log-view.component';
import { NavigationService } from 'src/app/core/services/navigation-service/navigation.service';


@NgModule({
  declarations: [MoneyViewComponent, LogViewComponent],
  imports: [
    CommonModule,
    MoneyRoutingModule,
    SharedModule
  ]
})
export class MoneyModule {}

