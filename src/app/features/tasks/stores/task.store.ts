import { Injectable } from '@angular/core';
import { TaskWeekStore } from './task-week.store';
import { TaskActivityListStore } from './task-activity-list.store';
import { TaskDefinitionListStore } from './task-definition-list.store';
import { TaskWeek } from '../entities/task-week';
import { TaskActivity } from '../entities/task-activity';
import { TaskDefinition } from '../entities/task-definition';

@Injectable({
  providedIn: 'root'
})
export class TaskStore {




  constructor(
    private _taskWeekStore: TaskWeekStore,
    private _taskActivityListStore: TaskActivityListStore,
    private _taskDefinitionListStore: TaskDefinitionListStore,

  ) { }
  private userIdentifier: string;
  private _selectedDate: Date;


  get taskWeek(): TaskWeek {
    return this._taskWeekStore.state;
  }

  get taskActivityList(): TaskActivity[] {
    return this._taskActivityListStore.state;
  }
  get taskDefinitionList(): TaskDefinition[] {
    return this._taskDefinitionListStore.state;
  }

  /**
   * Loads the state's data if it isn't already loeaded for the specified parameters.
   * If the parameters match previous loads, nothing new is loaded
   * @param userIdentifier the user object id for the data required.
   * @param selectedDate the date to load the data for
   */
  public async loadDataForTaskWeek(taskWeekId: number) {
    return new Promise((resolve, reject) => {
      this._taskWeekStore.loadDataForTaskWeek(taskWeekId)
        .then(taskWeek => {
          this._taskActivityListStore.loadDataWeek(taskWeek, this.taskDefinitionList)
            .then(() => resolve());
        });
    });

  }
  public async loadDataForDate(userIdentifier: string, selectedDate: Date) {
    return new Promise((resolve, reject) => {


      this.userIdentifier = userIdentifier;
      this._selectedDate = selectedDate;

      this._taskWeekStore.loadDataForDate(userIdentifier, selectedDate)
        .then(taskWeek => {
          this._taskActivityListStore.loadDataWeek(taskWeek, this.taskDefinitionList)
            .then(() => resolve());
        });
    });

  }
  saveTaskActivityList(): Promise<any> {
    return this._taskActivityListStore.save();
  }
  acceptTaskWeek(): Promise<any> {
    return this._taskWeekStore.accept();
  }
  saveTaskWeek(): Promise<any> {
    return this._taskWeekStore.save();
  }

}
