import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'profile',
    loadChildren: () => import('./modules/profile/profile.module').then(mod => mod.ProfileModule)
  },
  {
    path: 'tasks',
    loadChildren: () => import('./modules/tasks/tasks.module').then(mod => mod.TasksModule)
  },
  {
    path: 'money',
    loadChildren: () => import('./modules/money/money.module').then(mod => mod.MoneyModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
