export interface TaskActivity {

   id?: number;
   description: string;
   taskGroupId: number;
   completed: boolean;
   blocked: boolean;
   value: number;

   accountId: number;
   taskDayId: number;
   sequence: number;
   taskWeekId: number;
}
