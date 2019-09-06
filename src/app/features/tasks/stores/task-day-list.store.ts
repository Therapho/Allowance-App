import { Store } from 'src/app/core/types/store';
import { TaskDay } from '../entities/task-day';
import { TaskService } from '../services/task.service';

export class TaskDayListStore extends Store<TaskDay[]> {
  constructor(private taskService: TaskService) {
    super(null);
  }

  public loadData(
    accountId: number,
    taskWeekId: number,
    weekStartDate: Date
  ): Promise<TaskDay[]> {
    return new Promise<TaskDay[]>((resolve, reject) => {
      this.taskService
        .getTaskDayList(accountId, taskWeekId)
        .then(taskWeekList => {
            this.setState(taskWeekList);
            resolve(taskWeekList);
        });
    });
  }
}
