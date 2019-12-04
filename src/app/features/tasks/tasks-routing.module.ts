import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DayListViewComponent } from './views/task-list-view/task-list-view.component';
import { TaskWeekListViewComponent } from './views/task-week-list-view/task-week-list-view.component';

const routes: Routes = [
  {
    path: '',
    component: TaskWeekListViewComponent,
  },
  {
    path: 'details/:id',
    component: DayListViewComponent,
  },
  {
    path: 'details',
    component: DayListViewComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }
