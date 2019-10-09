import { TaskActivity } from './task-activity';
import { Constants } from 'src/app/core/common/constants';

export class TaskActivityItem {
  constructor(
  private _taskActivity: TaskActivity,
  private _day: number
  ) {}

  public get taskActivity(): TaskActivity {
    return this._taskActivity;
  }

  public get statusId(): number {
    let statusId = 0;
    switch (this._day) {
      case Constants.Day.Monday:
        statusId = this._taskActivity.mondayStatusId;
        break;
        case Constants.Day.Tuesday:
        statusId = this._taskActivity.tuesdayStatusId;
        break;
        case Constants.Day.Wednesday:
        statusId = this._taskActivity.wednesdayStatusId;
        break;
        case Constants.Day.Thursday:
        statusId = this._taskActivity.thursdayStatusId;
        break;
        case Constants.Day.Friday:
        statusId = this._taskActivity.fridayStatusId;
        break;
        case Constants.Day.Saturday:
        statusId = this._taskActivity.saturdayStatusId;
        break;
        case Constants.Day.Sunday:
        statusId = this._taskActivity.sundayStatusId;
        break;

    }
    return statusId;
  }
  public set statusId(value) {
    switch (this._day) {
      case Constants.Day.Monday:
        this._taskActivity.mondayStatusId = value;
        break;
        case Constants.Day.Tuesday:
        this._taskActivity.tuesdayStatusId = value;
        break;
        case Constants.Day.Wednesday:
        this._taskActivity.wednesdayStatusId = value;
        break;
        case Constants.Day.Thursday:
        this._taskActivity.thursdayStatusId = value;
        break;
        case Constants.Day.Friday:
        this._taskActivity.fridayStatusId = value;
        break;
        case Constants.Day.Saturday:
        this._taskActivity.saturdayStatusId = value;
        break;
        case Constants.Day.Sunday:
        this._taskActivity.sundayStatusId = value;
        break;

    }
  }
}
