import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';

const routes: Routes = [
  {
    path: 'profile',
    loadChildren: () => import('./modules/profile/profile.module').then(mod => mod.ProfileModule),
    canActivate : [MsalGuard]

  },
  {
    path: 'tasks',
    loadChildren: () => import('./modules/tasks/tasks.module').then(mod => mod.TasksModule),
    canActivate : [MsalGuard]
  },
  {
    path: 'money',
    loadChildren: () => import('./modules/money/money.module').then(mod => mod.MoneyModule),
    canActivate : [MsalGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
