export interface TaskActivity {

   id: number;
   description: string;
   taskGroupId: number;
   completed: boolean;
   blocked: boolean;
   value: number;

   forAccountId: number;
   taskDayId: number;
   sequence: number;
}
