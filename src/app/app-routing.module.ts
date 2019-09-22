import { NgModule, OnInit, OnDestroy } from '@angular/core';
import { Routes, RouterModule, Router, NavigationEnd, NavigationStart, RouterEvent } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { NavigationService } from './core/services/navigation-service/navigation.service';
import { Profile } from 'selenium-webdriver/firefox';

const routes: Routes = [
  {
    path: 'profile',
    loadChildren: () => import('./features/profile/profile.module').then(mod => mod.ProfileModule),
    canActivate : [MsalGuard]

  },
  {
    path: '',
    loadChildren: () => import('./features/profile/profile.module').then(mod => mod.ProfileModule),
    canActivate : [MsalGuard]

  },
  {
    path: 'tasks',
    loadChildren: () => import('./features/tasks/tasks.module').then(mod => mod.TasksModule),
    canActivate : [MsalGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor(router: Router, private navigationService: NavigationService) {

    navigationService.left.addNav({module: 'app', nav: [
      { text: 'Profile', path: '/profile', icon: 'perm_identity'},
      { text: 'Tasks', path: '/tasks', icon: 'done'}
    ]});
    navigationService.left.setNav('app');

    router.events
    .filter((event) => event instanceof NavigationEnd)
    .subscribe(event => {
      navigationEnded(navigationService, (event as NavigationEnd).url); });
  }
}
function navigationEnded(navigationService: NavigationService, url: string) {
  const module = url.split('/')[1];
  navigationService.top.setNav(module);
}

