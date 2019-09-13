import { TaskActivity } from './task-activity';

export interface TaskActivityMatrix {
  groupName: string;
  items: TaskActivityItem[];
}
export interface TaskActivityItem {
  description: string;
  monday: TaskActivity;
  tuesday: TaskActivity;
  wednesday: TaskActivity;
  thursday: TaskActivity;
  friday: TaskActivity;
  saturday: TaskActivity;
  sunday: TaskActivity;
}
