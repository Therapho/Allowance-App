import { Component, OnInit, Input } from '@angular/core';
import { TaskActivityMatrix } from '../../entities/task-activity-matrix';
import { Constants } from 'src/app/core/common/constants';
import { TaskActivity } from '../../entities/task-activity';
import { TaskStore } from '../../stores/task.store';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  @Input() taskActivityMatrixList: TaskActivityMatrix[];
  public displayedColumns: string[] = [
    'description',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday'
  ];

  constructor(private taskStore: TaskStore) {}

  ngOnInit() {}
  public statusChange(taskActivity: TaskActivity) {
    const taskDefinition = this.taskStore.taskDefinitionList.find(
      value => value.id === taskActivity.taskDefinitionId
    );

    if (taskActivity.statusId === Constants.ActivityStatus.Complete) {
      this.taskStore.taskWeek.value += taskDefinition.value;
    } else {
      this.taskStore.taskWeek.value -= taskDefinition.value;
    }
  }
  public clear(taskActivity: TaskActivity) {
    const taskDefinition = this.taskStore.taskDefinitionList.find(
      value => value.id === taskActivity.taskDefinitionId
    );

    this.taskStore.taskWeek.value -= taskDefinition.value;

  }
}
