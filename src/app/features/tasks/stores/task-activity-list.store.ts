import { TaskActivity } from '../entities/task-activity';
import { Store } from 'src/app/core/types/store';
import { TaskService } from '../services/task.service';
import { TaskDay } from '../entities/task-day';
import { TaskDefinition } from '../entities/task-definition';

export class TaskActivityListStore extends Store<TaskActivity[]> {

  constructor(private taskService: TaskService) {
    super(null);
  }
  public save(): Promise<any> {
    return this.taskService.putTaskActivityList(this.state);

  }

  public loadDataWeek(userIdentifier: string, taskWeekId: number, taskDayList: TaskDay[], taskDefinitionList: TaskDefinition[]):
    Promise < TaskActivity[] > {
    return new Promise<TaskActivity[]>((resolve, reject) => {
      this.taskService.getOrCreateTaskActivityList(userIdentifier, taskWeekId)
        .then((taskActivityList: TaskActivity[]) => {

            this.setState(taskActivityList);
            resolve(taskActivityList);

        })
        .catch(error => reject(error));
    });
  }

}
