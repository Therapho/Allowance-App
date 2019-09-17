import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { TaskCardComponent } from './components/task-card/task-card.component';
import { TaskGroupFilterPipe } from './pipes/task-group-filter.pipe';
import { DayListViewComponent } from './views/day-list-view/day-list-view.component';
import { TaskDayListStore } from './stores/task-day-list.store';
import { TaskWeekStore } from './stores/task-week.store';
import { TaskDefinitionListStore } from './stores/task-definition-list.store';
import { TaskActivityListStore } from './stores/task-activity-list.store';
import { TaskStore } from './stores/task.store';
import { TaskCheckboxComponent } from './components/task-checkbox/task-checkbox.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskWeekListViewComponent } from './views/task-week-list-view/task-week-list-view.component';
import { TaskWeekListStore } from './stores/task-week-list.store';

@NgModule({
  declarations: [
    TaskCardComponent,
    TaskGroupFilterPipe,
    DayListViewComponent,
    TaskCheckboxComponent,
    TaskListComponent,
    TaskWeekListViewComponent
  ],
  imports: [CommonModule, TasksRoutingModule, SharedModule],
  providers: [
    TaskWeekStore,
    TaskDayListStore,
    TaskDefinitionListStore,
    TaskActivityListStore,
    TaskWeekListStore,
    TaskStore

  ]
})
export class TasksModule {}
