import { Store } from 'src/app/core/types/store';
import { TaskWeek } from '../entities/task-week';
import { TaskService } from '../services/task.service';

export class TaskWeekListStore extends Store<TaskWeek[]> {

  constructor(private taskService: TaskService) {
    super(null);
  }

  public loadData(startDate: Date, endDate: Date): Promise<TaskWeek[]> {
    return new Promise<TaskWeek[]>((resolve, reject) => {
      this.taskService
        .getTaskWeeks(startDate, endDate)
        .then(taskWeekList => {
            this.setState(taskWeekList);
            resolve(taskWeekList);
        }).catch(error => reject(error));
      });
  }

}
