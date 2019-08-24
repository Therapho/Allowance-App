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
          if (taskWeekList && taskWeekList.length > 0) {
            this.setState(taskWeekList);
            resolve(taskWeekList);
          } else {
            this.createNewTaskDayList(accountId, taskWeekId, weekStartDate)
              .then(newTaskDayList => {
                this.setState(newTaskDayList);
                resolve(newTaskDayList);
              })
              .catch(error => reject(error));
          }
        });
    });
  }

  createNewTaskDayList(
    accountId: number,
    taskWeekId: number,
    startDate: Date
  ): Promise<TaskDay[]> {
    return new Promise<TaskDay[]>((resolve, reject) => {
      const taskDayList: TaskDay[] = [];

      for (let index = 0; index < 7; index++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + index);

        const taskDay: TaskDay = {
          id: null,
          accountId,
          date,
          statusId: 1,
          taskWeekId,
          value: 0
        };
        this.taskService
          .putTaskDay(taskDay)
          .then(id => {
            taskDay.id = id;
            taskDayList.push(taskDay);
          })
          .catch(error => reject(error));
      }
      resolve(taskDayList);
    });
  }
}
