import { Pipe, PipeTransform } from '@angular/core';
import { TaskDefinition } from '../entities/task-definition';

@Pipe({
  name: 'taskDefinitionFilter'
})
export class TaskDefinitionFilterPipe implements PipeTransform {

  transform(items: TaskDefinition[], filter: number): string {
    if (items == null || filter == null) { return null; }
    const results = items.filter(item => item.id === filter);

    return results[0] && results[0].description;
  }

}
