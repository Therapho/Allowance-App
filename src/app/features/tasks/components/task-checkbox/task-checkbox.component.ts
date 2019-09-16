import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { TaskActivity } from '../../entities/task-activity';
import { Constants } from 'src/app/core/common/constants';


@Component({
  selector: 'app-task-checkbox',
  templateUrl: './task-checkbox.component.html',
  styleUrls: ['./task-checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskCheckboxComponent implements OnInit {
  @Input() taskActivity: TaskActivity = null;
  @Input() mode = '';
  @Output() statusChange: EventEmitter<TaskActivity> = new EventEmitter();
  public status = '';
  constructor() { }

  ngOnInit() {

    switch (this.taskActivity.statusId) {
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
    let statusId = this.taskActivity.statusId;

    if (statusId === Constants.ActivityStatus.Incomplete || statusId === Constants.ActivityStatus.Blocked) {
      statusId = Constants.ActivityStatus.Complete;
      this.status = 'Complete';
      } else {
        statusId = Constants.ActivityStatus.Blocked;
        this.status = 'Blocked';
      }

    this.taskActivity.statusId = statusId;
    this.statusChange.emit(this.taskActivity);
  }
  onPress(event) {
    let statusId = this.taskActivity.statusId;

    if (statusId === Constants.ActivityStatus.Complete || statusId === Constants.ActivityStatus.Blocked) {
      statusId = Constants.ActivityStatus.Incomplete;
      this.status = 'Incomplete';

      this.taskActivity.statusId = statusId;
      this.statusChange.emit(this.taskActivity);

    }
    event.preventDefault();
  }
}
