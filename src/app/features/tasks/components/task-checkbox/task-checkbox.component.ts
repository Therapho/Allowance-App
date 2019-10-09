import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { TaskActivity } from '../../entities/task-activity';
import { Constants } from 'src/app/core/common/constants';
import { TaskActivityItem } from '../../entities/task-activity-item';


@Component({
  selector: 'app-task-checkbox',
  templateUrl: './task-checkbox.component.html',
  styleUrls: ['./task-checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskCheckboxComponent implements OnInit {
  @Input() taskActivityItem: TaskActivityItem = null;
  @Input() day: string;
  @Input() canEdit: boolean;
  @Output() statusChange: EventEmitter<TaskActivityItem> = new EventEmitter();
  @Output() clear: EventEmitter<TaskActivityItem> = new EventEmitter();
  public status = '';
  constructor() { }

  ngOnInit() {
    switch (this.taskActivityItem.statusId) {
      case Constants.ActivityStatus.Blocked:
        this.status = 'Blocked';
        break;
      case Constants.ActivityStatus.Complete:
        this.status = 'Complete';
        break;
      case Constants.ActivityStatus.Incomplete:
        this.status = 'Incomplete';
        break;
    }
  }


  onTap(event) {
    if (!this.canEdit) {return; }
    let statusId = this.taskActivityItem.statusId;

    if (statusId === Constants.ActivityStatus.Incomplete || statusId === Constants.ActivityStatus.Blocked) {
      statusId = Constants.ActivityStatus.Complete;
      this.status = 'Complete';
      } else {
        statusId = Constants.ActivityStatus.Blocked;
        this.status = 'Blocked';
      }

    this.taskActivityItem.statusId = statusId;
    this.statusChange.emit(this.taskActivityItem);
  }
  onPress(event) {
    if (!this.canEdit) {return; }
    let statusId = this.taskActivityItem.statusId;

    if (statusId === Constants.ActivityStatus.Complete) {
      this.clear.emit(this.taskActivityItem);
    }
    if (statusId === Constants.ActivityStatus.Complete || statusId === Constants.ActivityStatus.Blocked) {
      statusId = Constants.ActivityStatus.Incomplete;
      this.status = 'Incomplete';

      this.taskActivityItem.statusId = statusId;


    }
    event.preventDefault();
  }
}
