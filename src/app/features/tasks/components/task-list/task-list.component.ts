import { Component, OnInit, Input } from '@angular/core';
import { TaskActivityMatrix } from '../../entities/task-activity-matrix';
import { Constants } from 'src/app/core/common/constants';
import { TaskActivity } from '../../entities/task-activity';
import { TaskStore } from '../../stores/task.store';
import { TaskActivityItem } from '../../entities/task-activity-item';
import { LookupStore } from 'src/app/core/stores/lookup.store';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  @Input() taskActivityList: TaskActivity[];
  @Input() canEdit: boolean;

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

  constructor(public taskStore: TaskStore, public lookupStore: LookupStore) {}

  ngOnInit() {}
  public statusChange(taskActivityItem: TaskActivityItem) {
    if (!this.canEdit) {return; }
    const taskDefinition = this.taskStore.taskDefinitionList.find(
      value => value.id === taskActivityItem.taskActivity.taskDefinitionId
    );

    if (taskActivityItem.statusId === Constants.ActivityStatus.Complete) {
      this.taskStore.taskWeek.value += taskDefinition.value;
    } else {
      this.taskStore.taskWeek.value -= taskDefinition.value;
    }
  }
  public clear(taskActivityItem: TaskActivityItem) {
    if (!this.canEdit) {return; }
    const taskDefinition = this.taskStore.taskDefinitionList.find(
      value => value.id === taskActivityItem.taskActivity.taskDefinitionId
    );

    this.taskStore.taskWeek.value -= taskDefinition.value;

  }
}
