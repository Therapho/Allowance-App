import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router, NavigationEnd } from '@angular/router';
import { MoneyViewComponent } from './views/money-view/money-view.component';
import { LogViewComponent } from './views/log-view/log-view.component';
import { NavigationService } from 'src/app/core/services/navigation-service/navigation.service';
import { NavigationLink } from '../../core/types/navigation-link';
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
export class MoneyRoutingModule {
  constructor(router: Router, navigationService: NavigationService) {

    navigationService.top.addNav({module: 'money', nav: [
      {text: 'Summary', path: 'money', icon: 'attach_money'},
      {text: 'Log', path: 'money/log', icon: 'list'}
    ]});
  }
}
