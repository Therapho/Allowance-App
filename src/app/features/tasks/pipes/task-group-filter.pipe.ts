import { Pipe, PipeTransform } from '@angular/core';
import { TaskGroup } from 'src/app/core/entities/task-group';
import { TaskActivity } from '../entities/task-activity';

@Pipe({
  name: 'taskGroupFilter'
})
export class TaskGroupFilterPipe implements PipeTransform {

  transform(items: TaskActivity[], filter: TaskGroup): TaskActivity[] {
    if (items == null || filter == null) { return null; }
    const results = items.filter(item => item.taskGroupId === filter.id);
    return results;
  }

}
