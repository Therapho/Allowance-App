import { TaskActivity } from './task-activity';

export interface TaskActivityItem {
  description: string;
  value: number;
  monday: TaskActivity;
  tuesday: TaskActivity;
  wednesday: TaskActivity;
  thursday: TaskActivity;
  friday: TaskActivity;
  saturday: TaskActivity;
  sunday: TaskActivity;
}
