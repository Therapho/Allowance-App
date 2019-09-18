export class TaskDay {
  id: number;
  date: Date;
  statusId: number;
  value: number;
  taskWeekId: number;
  userIdentifier: string;
  static map(data: TaskDay): TaskDay {
    const taskDay: TaskDay = {
      id: +data.id,
      date: new Date(data.date),
      statusId: +data.statusId,
      value: +data.value,
      userIdentifier: data.userIdentifier,
      taskWeekId: +data.taskWeekId
    };
    return taskDay;
  }
}
