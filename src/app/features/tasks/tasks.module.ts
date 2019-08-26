import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { TaskCardComponent } from './components/task-card/task-card.component';
import { TaskListViewComponent } from './views/task-list-view/task-list-view.component';
import { TaskGroupFilterPipe } from './pipes/task-group-filter.pipe';
import { DayListViewComponent } from './views/day-list-view/day-list-view.component';
import { TaskDayListStore } from './stores/task-day-list.store';
import { TaskWeekStore } from './stores/task-week.store';
import { TaskDefinitionListStore } from './stores/task-definition-list.store';
import { TaskActivityListStore } from './stores/task-activity-list.store';
import { TaskStore } from './stores/task.store';


@NgModule({
  declarations: [TaskCardComponent, TaskListViewComponent, TaskGroupFilterPipe, DayListViewComponent] ,
  imports: [
    CommonModule,
    TasksRoutingModule,
    SharedModule
  ],
  providers: [TaskWeekStore, TaskDayListStore, TaskDefinitionListStore, TaskActivityListStore, TaskStore ]
})
export class TasksModule { }
