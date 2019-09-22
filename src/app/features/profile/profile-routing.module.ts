import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileViewComponent } from './views/profile-view/profile-view.component';
import { LogViewComponent } from './views/log-view/log-view.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileViewComponent
  },
  {
    path: 'log/:accountid',
    component: LogViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
