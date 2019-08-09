import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskListViewComponent } from './views/task-list-view/task-list-view.component';
import { DayListViewComponent } from './views/day-list-view/day-list-view.component';

const routes: Routes = [
  {
    path: '',
    component: DayListViewComponent,
  },
  {
    path: 'tasklist',
    component: TaskListViewComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }
