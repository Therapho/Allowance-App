import { TaskActivity } from './task-activity';
import { TaskActivityItem } from './task-activity-item';

export interface TaskActivityMatrix {
  groupName: string;
  items: TaskActivityItem[];
}

