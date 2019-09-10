import { Component, OnInit, OnDestroy } from '@angular/core';
import { AccountStore } from 'src/app/core/stores/account.store';
import { DateUtilities } from 'src/app/core/utilities/dateUtilities';
import { TaskStore } from '../../stores/task.store';
import { LookupStore } from 'src/app/core/stores/lookup.store';
import { MatSlideToggleChange } from '@angular/material';
import { TaskActivity } from '../../entities/task-activity';
import { Constants } from '../../common/constants';

@Component({
  selector: 'app-day-list-view',
  templateUrl: './day-list-view.component.html',
  styleUrls: ['./day-list-view.component.scss']
})
export class DayListViewComponent implements OnInit {

  public selectedDate: Date;
  public taskActivityMatrix: any[];
  public displayedColumns: string[] = ['description', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  public mode = 'Complete';

  constructor(public accountStore: AccountStore, public taskStore: TaskStore, public lookUpStore: LookupStore) { }

  ngOnInit() {
    this.selectedDate = DateUtilities.getMonday(new Date());
    this.taskStore.loadData(this.accountStore.state.id, this.selectedDate)
      .then(() => {
        this.buildTaskActivityMatrix();
      });

  }


  buildTaskActivityMatrix() {
    const taskActivityMatrix = [];
    const taskActivityList = this.taskStore.taskActivityList;

    this.taskStore.taskDefinitionList.forEach((taskDefinition, index) => {
      const taskIndex = index * 7;
      taskActivityMatrix.push(
        {
          description: taskDefinition.description,
          monday: taskActivityList[taskIndex],
          tuesday: taskActivityList[taskIndex + 1],
          wednesday: taskActivityList[taskIndex + 2],
          thursday: taskActivityList[taskIndex + 3],
          friday: taskActivityList[taskIndex + 4],
          saturday: taskActivityList[taskIndex + 5],
          sunday: taskActivityList[taskIndex + 6],
        }
      );

      this.taskActivityMatrix = taskActivityMatrix;
    });

  }
  save() {
    this.taskStore.saveTaskActivityList();
  }
  public statusChange(taskActivity: TaskActivity) {
    if (taskActivity.statusId === Constants.ActivityStatus.Complete) {
      this.taskStore.taskWeek.value += taskActivity.value;
    } else {
      this.taskStore.taskWeek.value -= taskActivity.value;
    }
  }
}
