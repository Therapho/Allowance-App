import { Component, OnInit, OnDestroy } from '@angular/core';
import { AccountStore } from 'src/app/core/stores/account.store';
import { DateUtilities } from 'src/app/core/utilities/dateUtilities';
import { TaskStore } from '../../stores/task.store';
import { LookupStore } from 'src/app/core/stores/lookup.store';
import { TaskActivity } from '../../entities/task-activity';
import { Constants } from '../../common/constants';
import { TaskActivityMatrix } from '../../entities/task-activity-matrix';

@Component({
  selector: 'app-day-list-view',
  templateUrl: './day-list-view.component.html',
  styleUrls: ['./day-list-view.component.scss']
})
export class DayListViewComponent implements OnInit {

  public selectedDate: Date;
  public displayedColumns: string[] = ['description', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  public mode = 'Complete';
  taskActivityMatrixList: TaskActivityMatrix[];

  constructor(public accountStore: AccountStore, public taskStore: TaskStore, public lookUpStore: LookupStore) { }

  ngOnInit() {
    this.selectedDate = DateUtilities.getMonday(new Date());
    this.taskStore.loadData(this.accountStore.state.id, this.selectedDate)
      .then(() => {
        this.buildTaskActivityMatrix();
      });

  }


  buildTaskActivityMatrix() {
    const taskActivityMatrixList: TaskActivityMatrix[] = [];
    const taskActivityList = this.taskStore.taskActivityList;
    this.lookUpStore.taskGroups.forEach((group) => {
      const taskActivityMatrix: TaskActivityMatrix = {groupName: group.name, items: []};

      this.taskStore.taskDefinitionList.filter(value => value.taskGroupId === group.id).forEach((taskDefinition) => {
        const taskActivityGroup = taskActivityList.filter(task => task.taskGroupId === taskDefinition.taskGroupId);
        const item = {
            description: taskDefinition.description,
            monday: taskActivityGroup.find(task => task.daySequence === 1 && task.taskDefinitionId === taskDefinition.id),
            tuesday: taskActivityGroup.find(task => task.daySequence === 2 && task.taskDefinitionId === taskDefinition.id),
            wednesday: taskActivityGroup.find(task => task.daySequence === 3 && task.taskDefinitionId === taskDefinition.id),
            thursday: taskActivityGroup.find(task => task.daySequence === 4 && task.taskDefinitionId === taskDefinition.id),
            friday: taskActivityGroup.find(task => task.daySequence === 5 && task.taskDefinitionId === taskDefinition.id),
            saturday: taskActivityGroup.find(task => task.daySequence === 6 && task.taskDefinitionId === taskDefinition.id),
            sunday: taskActivityGroup.find(task => task.daySequence === 7 && task.taskDefinitionId === taskDefinition.id),
        };
        taskActivityMatrix.items.push(item);

      });
      taskActivityMatrixList.push(taskActivityMatrix);
    });
    this.taskActivityMatrixList = taskActivityMatrixList;
  }
  save() {
    this.taskStore.saveTaskActivityList();
    this.taskStore.saveTaskWeek();
  }
  public statusChange(taskActivity: TaskActivity) {
    const taskDefinition = this.taskStore.taskDefinitionList.find(value => value.id === taskActivity.taskDefinitionId);

    if (taskActivity.statusId === Constants.ActivityStatus.Complete) {
      this.taskStore.taskWeek.value += taskDefinition.value;
    } else {
      this.taskStore.taskWeek.value -= taskDefinition.value;
    }
  }
}
