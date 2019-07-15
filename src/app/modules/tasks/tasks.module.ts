import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { TaskListComponent } from './components/task-list/task-list.component';
import { MaterialModule } from '../../shared/modules/material/material.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TaskCardComponent } from './components/task-card/task-card.component';

@NgModule({
  declarations: [TaskListComponent, TaskCardComponent],
  imports: [
    CommonModule,
    TasksRoutingModule,
    MaterialModule,
    MatCheckboxModule,
    FlexLayoutModule
  ]
})
export class TasksModule { }
