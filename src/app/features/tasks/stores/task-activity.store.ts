import { TaskActivity } from '../entities/task-activity';
import { Store } from 'src/app/core/types/store';
import { TaskService } from '../services/task.service';

export class TaskActivityStore extends Store<TaskActivity[]> {
  constructor(private taskService: TaskService) {
    super(null);
  }

  public load(taskDayId: number) {
    this.taskService.getTaskActivityByDay(taskDayId).subscribe(
      (data: TaskActivity[]) =>
      this.setState(data));
  }
}
