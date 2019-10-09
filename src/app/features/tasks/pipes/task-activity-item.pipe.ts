import { Pipe, PipeTransform } from '@angular/core';
import { TaskActivity } from '../entities/task-activity';
import { TaskActivityItem } from '../entities/task-activity-item';

@Pipe({
  name: 'taskActivityItem'
})
export class TaskActivityItemPipe implements PipeTransform {

  transform(taskActivity: TaskActivity, day: number): TaskActivityItem {
    if (taskActivity == null || day == null) { return null; }
    const item = new TaskActivityItem(taskActivity, day);
    return item;
  }
}
