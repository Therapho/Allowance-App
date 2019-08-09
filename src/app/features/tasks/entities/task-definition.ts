export interface TaskDefinition {
  id: number;
  taskGroupId: number;
  description: string;
  value: number;
  sequence: number;
  weekly: boolean;
  maximum: number;
}
