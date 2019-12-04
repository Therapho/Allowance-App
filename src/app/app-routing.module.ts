import { NgModule, OnInit, OnDestroy } from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';
import { NavigationService } from './core/services/navigation-service/navigation.service';
import { HomeComponent } from './views/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'state',
    component: HomeComponent
  },
  {
    path: 'error',
    component: HomeComponent
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./features/profile/profile.module').then(mod => mod.ProfileModule)
  },
  {
    path: 'tasks',
    loadChildren: () =>
      import('./features/tasks/tasks.module').then(mod => mod.TasksModule)
  },
  {
    path: 'admin',
    loadChildren: () =>
    import('./features/admin/admin.module').then(m => m.AdminModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor() {}
}
