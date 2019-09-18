export class TaskDefinition {
  id: number;
  taskGroupId: number;
  description: string;
  value: number;
  sequence: number;
  weekly: boolean;
  static map(data: TaskDefinition): TaskDefinition {
    const taskDefinition: TaskDefinition = {
      id: +data.id,
      taskGroupId: +data.taskGroupId,
      description: data.description,
      value: +data.value,
      sequence: +data.sequence,
      weekly: data.weekly,
    };
    return taskDefinition;
  }
}
