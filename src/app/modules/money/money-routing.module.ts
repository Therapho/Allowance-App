import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoneyViewComponent } from './components/money-view/money-view.component';
import { LogViewComponent } from './components/log-view/log-view.component';

const routes: Routes = [
  {
    path: '',
    component: MoneyViewComponent
  },
  {
    path: 'log',
    component: LogViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoneyRoutingModule { }
