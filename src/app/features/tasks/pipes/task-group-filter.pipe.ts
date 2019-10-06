import { Pipe, PipeTransform } from '@angular/core';
import { TaskDefinition } from '../entities/task-definition';
import { TaskGroup } from 'src/app/core/entities/task-group';

@Pipe({
  name: 'taskGroupFilter'
})
export class TaskGroupFilterPipe implements PipeTransform {

  transform(items: TaskDefinition[], filter: TaskGroup): TaskDefinition[] {
    if (items == null || filter == null) { return null; }
    const results = items.filter(item => item.taskGroupId === filter.id);
    return results;
  }

}
