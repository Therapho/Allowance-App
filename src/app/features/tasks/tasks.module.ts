import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { TaskCardComponent } from './components/task-card/task-card.component';
import { TaskListViewComponent } from './views/task-list-view/task-list-view.component';
import { TaskGroupFilterPipe } from './pipes/task-group-filter.pipe';
import { DayListViewComponent } from './views/day-list-view/day-list-view.component';
import { LookupFilterPipe } from 'src/app/core/pipes/lookup-filter.pipe';


@NgModule({
  declarations: [TaskCardComponent, TaskListViewComponent, TaskGroupFilterPipe, DayListViewComponent] ,
  imports: [
    CommonModule,
    TasksRoutingModule,
    SharedModule
  ],
  providers: [ ]
})
export class TasksModule { }
