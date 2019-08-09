
import { Store } from 'src/app/core/types/store';
import { TaskWeek } from '../entities/task-week';
import { TaskService } from '../services/task.service';

export class TaskWeekStore extends Store<TaskWeek[]> {
  constructor(private taskService: TaskService) {
    super(null);
  }

  public loadOrCreate(accountId: number, date: Date) {
    this.taskService.getTaskWeekList(accountId, date).subscribe(
      (data: TaskWeek[]) => {
        if (data.length === 0) {
          const taskWeek = {id: null, weekStartDate: date, statusId: 1, daysCompleted: 0, accountId, value: 0};
          this.taskService.putTaskWeek(taskWeek).subscribe(id => {
              taskWeek.id = id;
              this.setState([taskWeek]);
          }  );
        } else {
          this.setState(data);
        }


      }
    );
  }

  public load(accountId: number, startDate: Date, endDate?: Date) {
    this.taskService.getTaskWeekList(accountId, startDate, endDate).subscribe(
      (data: TaskWeek[]) =>
      this.setState(data));
  }
}
