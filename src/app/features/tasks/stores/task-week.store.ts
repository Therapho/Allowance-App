import { Store } from 'src/app/core/types/store';
import { TaskWeek } from '../entities/task-week';
import { TaskService } from '../services/task.service';

export class TaskWeekStore extends Store<TaskWeek> {
  constructor(private taskService: TaskService) {
    super(null);
  }

  public loadData(accountId: number, selectedDate: Date): Promise<TaskWeek> {
    return new Promise<TaskWeek>((resolve, reject) => {
      this.taskService
        .getTaskWeekList(accountId, selectedDate)
        .then(taskWeekList => {
          if (taskWeekList && taskWeekList.length > 0) {
            this.setState(taskWeekList[0]);
            resolve(taskWeekList[0]);
          } else {
            this.createNewTaskWeek(accountId, selectedDate).then(
              newTaskWeek => {
                this.setState(newTaskWeek);
                resolve(newTaskWeek);
              }
            ).catch(error => reject(error));
          }
        }).catch(error => reject(error));
      });
  }

  createNewTaskWeek(accountId: number, weekStartDate: Date): Promise<TaskWeek> {
    const taskWeek: TaskWeek = {
      id: null,
      weekStartDate,
      statusId: 1,
      daysCompleted: 0,
      accountId,
      value: 0
    };
    return new Promise<TaskWeek>((resolve, reject) => {
      this.taskService
        .putTaskWeek(taskWeek)
        .then(id => {
          taskWeek.id = id;
          resolve(taskWeek);
        })
        .catch(error => reject(error));
    });
  }
}
