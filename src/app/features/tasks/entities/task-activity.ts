export class TaskActivity {

   id?: number;
   taskGroupId: number;
   taskDayId: number;
   sequence: number;
   taskWeekId: number;
   mondayStatusId: number;
   tuesdayStatusId: number;
   wednesdayStatusId: number;
   thursdayStatusId: number;
   fridayStatusId: number;
   saturdayStatusId: number;
   sundayStatusId: number;
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
        mondayStatusId: +data.mondayStatusId,
        tuesdayStatusId: +data.tuesdayStatusId,
        wednesdayStatusId: +data.wednesdayStatusId,
        thursdayStatusId: +data.thursdayStatusId,
        fridayStatusId: +data.fridayStatusId,
        saturdayStatusId: +data.saturdayStatusId,
        sundayStatusId: +data.sundayStatusId,
        taskDefinitionId: +data.taskDefinitionId,
        daySequence: +data.daySequence,
        userIdentifier: data. userIdentifier
      };
      return taskActivity; }
   }
}
