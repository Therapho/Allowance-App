export class TaskWeek {
  id?: number;
  weekStartDate: Date;
  statusId: number;
  value: number;
  userIdentifier: string;
  static map(data: TaskWeek): TaskWeek {
    const taskWeek: TaskWeek = {
      id: +data.id,
      weekStartDate: new Date(data.weekStartDate),
      statusId: +data.statusId,
      value: +data.value,
      userIdentifier: data.userIdentifier
    };
    return taskWeek;
  }
}
