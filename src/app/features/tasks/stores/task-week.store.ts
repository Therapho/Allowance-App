import { Store } from 'src/app/core/types/store';
import { TaskWeek } from '../entities/task-week';
import { TaskService } from '../services/task.service';

export class TaskWeekStore extends Store<TaskWeek> {

  constructor(private taskService: TaskService) {
    super(null);
  }

  public loadData(userIdentifier: string, selectedDate: Date): Promise<TaskWeek> {
    return new Promise<TaskWeek>((resolve, reject) => {
      this.taskService
        .getOrCreateTaskWeek(userIdentifier, selectedDate)
        .then(taskWeek => {
            this.setState(taskWeek);
            resolve(taskWeek);
        }).catch(error => reject(error));
      });
  }
  save(): Promise<any> {
    return this.taskService.putTaskWeek(this.state);
  }
}
