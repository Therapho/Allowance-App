import { Store } from '../../../core/types/store';
import { Injectable } from '@angular/core';
import { TaskDefinition } from '../entities/task-definition';
import { TaskService } from '../services/task.service';

@Injectable()
export class TaskDefinitionStore extends Store<TaskDefinition[]> {
  constructor(private taskService: TaskService) {
    super(null);
  }

  public load() {
    this.taskService.getTaskDefinitionList().subscribe(
      (data: TaskDefinition[]) =>
      this.setState(data));
  }
}
