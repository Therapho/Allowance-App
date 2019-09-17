import { Store } from 'src/app/core/types/store';
import { TaskDay } from '../entities/task-day';
import { TaskService } from '../services/task.service';
import { TaskWeek } from '../entities/task-week';

export class TaskDayListStore extends Store<TaskDay[]> {
  constructor(private taskService: TaskService) {
    super(null);
  }

  public loadData(
  taskWeek: TaskWeek
  ): Promise<TaskDay[]> {
    return new Promise<TaskDay[]>((resolve, reject) => {
      this.taskService
        .getTaskDayList(taskWeek.userIdentifier, taskWeek.id)
        .then(taskWeekList => {
            this.setState(taskWeekList);
            resolve(taskWeekList);
        });
    });
  }
}
