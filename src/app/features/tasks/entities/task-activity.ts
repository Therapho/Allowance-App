export class TaskActivity {

   id?: number;
   taskGroupId: number;
   taskDayId: number;
   sequence: number;
   taskWeekId: number;
   statusId: number;
   daySequence: number;
   taskDefinitionId: number;
   userIdentifier: string;
   static map(data: TaskActivity): TaskActivity {
    {
      const taskActivity: TaskActivity = {
        id: +data.id,
        taskGroupId: data.taskGroupId,
        taskDayId: +data.taskDayId,
        sequence: +data.sequence,
        taskWeekId: +data.taskWeekId,
        statusId: +data.statusId,
        taskDefinitionId: +data.taskDefinitionId,
        daySequence: +data.daySequence,
        userIdentifier: data. userIdentifier
      };
      return taskActivity; }
   }
}
