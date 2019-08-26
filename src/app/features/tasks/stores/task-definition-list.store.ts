import { Store } from '../../../core/types/store';
import { Injectable } from '@angular/core';
import { TaskDefinition } from '../entities/task-definition';
import { TaskService } from '../services/task.service';

@Injectable()
export class TaskDefinitionListStore extends Store<TaskDefinition[]> {
  constructor(private taskService: TaskService) {
    super(null);
  }
  loadData() {
    this.taskService.getTaskDefinitionList().then(
      (data: TaskDefinition[]) =>
        this.setState(data));
  }
}
