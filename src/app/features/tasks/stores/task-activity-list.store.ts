import { TaskActivity } from '../entities/task-activity';
import { Store } from 'src/app/core/types/store';
import { TaskService } from '../services/task.service';
import { TaskDay } from '../entities/task-day';
import { TaskDefinition } from '../entities/task-definition';

export class TaskActivityListStore extends Store<TaskActivity[]> {
  constructor(private taskService: TaskService) {
    super(null);
  }

  public loadDataWeek(accountId: number, taskWeekId: number, taskDayList: TaskDay[], taskDefinitionList: TaskDefinition[]):
    Promise<TaskActivity[]> {
    return new Promise<TaskActivity[]>((resolve, reject) => {
      this.taskService.getTaskActivityListByWeek(accountId, taskWeekId)
        .then((taskActivityList: TaskActivity[]) => {
          if (taskActivityList && taskActivityList.length > 0) {
            this.setState(taskActivityList);
            resolve(taskActivityList);
          } else {
            this.createTaskActivityList(accountId, taskWeekId, taskDayList, taskDefinitionList)
              .then(newTaskActivityList => {
                this.setState(newTaskActivityList);
                resolve(newTaskActivityList);
              });
          }
        })
        .catch(error => reject(error));
    });
  }
  createTaskActivityList(accountId: number, taskWeekId: number, taskDayList: TaskDay[], taskDefinitionList: TaskDefinition[]):
    Promise<TaskActivity[] > {
    return new Promise<TaskActivity[]>((resolve, reject) => {
      const taskActivityList: TaskActivity[] = [];
      taskDayList.forEach(taskDay => {
        taskDefinitionList.forEach(taskDefinition => {
          const taskActivity: TaskActivity = {
            id: null,
            description: taskDefinition.description,
            taskGroupId: taskDefinition.taskGroupId,
            completed: false,
            blocked: false,
            value: taskDefinition.value,
            accountId,
            taskDayId: taskDay.id,
            sequence: taskDefinition.sequence,
            taskWeekId
          };
          taskActivityList.push(taskActivity);
        });
      });
      this.taskService.putTaskActivityList(taskActivityList)
      .then(() => {
        this.taskService.getTaskActivityListByWeek(accountId, taskWeekId)
        .then(retrievedTaskWeekList => resolve(retrievedTaskWeekList))
        .catch(error => reject(error));
      }, error => {
        reject(error); }
        );
    });

  }
}
