import { Component, OnInit, OnDestroy } from '@angular/core';
import { AccountStore } from 'src/app/core/stores/account.store';
import { DateUtilities } from 'src/app/core/utilities/dateUtilities';
import { TaskStore } from '../../stores/task.store';
import { LookupStore } from 'src/app/core/stores/lookup.store';

import { TaskActivityMatrix } from '../../entities/task-activity-matrix';
import { TaskActivityItem } from '../../entities/task-activity-item';
import { Constants } from 'src/app/core/common/constants';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { BusyService } from 'src/app/core/services/busy-service/busy.service';


@Component({
  selector: 'app-day-list-view',
  templateUrl: './day-list-view.component.html',
  styleUrls: ['./day-list-view.component.scss']
})
export class DayListViewComponent implements OnInit, OnDestroy {

  routeSubscription: Subscription;
  constructor(
    public accountStore: AccountStore,
    public taskStore: TaskStore,
    public lookUpStore: LookupStore,
    private route: ActivatedRoute,
    private router: Router,
    public busy: BusyService
  ) { }
  public selectedDate: Date;

  taskActivityMatrixList: TaskActivityMatrix[];

  ngOnInit() {
    // const taskWeekId = this.route.snapshot.paramMap.get('id');
    // this.loadData(taskWeekId);
    this.routeSubscription = this.route.paramMap.subscribe(params => {
      this.busy.setState(true);
      this.loadData(params.get('id'))
        .finally(() => this.busy.setState(false));
    });
  }
  loadData(taskWeekId): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      if (taskWeekId) {
        this.taskStore.loadDataForTaskWeek(+taskWeekId).then(() => {
          this.buildTaskActivityMatrix();
        }).catch(reason => reject(reason));
      } else {
        if (this.accountStore.isParent) {
          reject('Parent\'s can\'t have their own task list.');
        }
        this.selectedDate = DateUtilities.getMonday(new Date());
        this.taskStore
          .loadDataForDate(
            this.accountStore.currentAccount.userIdentifier,
            this.selectedDate
          )
          .then(() => {
            this.buildTaskActivityMatrix();
            resolve();
          }).catch(reason => reject(reason));
      }
    });

  }
  buildTaskActivityMatrix() {
    const taskActivityMatrixList: TaskActivityMatrix[] = [];
    const taskActivityList = this.taskStore.taskActivityList;
    let value = 0;
    this.lookUpStore.taskGroups.forEach(group => {
      const taskActivityMatrix: TaskActivityMatrix = {
        groupName: group.name,
        items: []
      };

      this.taskStore.taskDefinitionList
        .filter(definition => definition.taskGroupId === group.id)
        .forEach(taskDefinition => {
          const taskActivityGroup = taskActivityList.filter(
            task => task.taskGroupId === taskDefinition.taskGroupId
          );
          const item: TaskActivityItem = {
            description: taskDefinition.description,
            value: taskDefinition.value,
            monday: taskActivityGroup.find(
              task =>
                task.daySequence === 1 &&
                task.taskDefinitionId === taskDefinition.id
            ),
            tuesday: taskActivityGroup.find(
              task =>
                task.daySequence === 2 &&
                task.taskDefinitionId === taskDefinition.id
            ),
            wednesday: taskActivityGroup.find(
              task =>
                task.daySequence === 3 &&
                task.taskDefinitionId === taskDefinition.id
            ),
            thursday: taskActivityGroup.find(
              task =>
                task.daySequence === 4 &&
                task.taskDefinitionId === taskDefinition.id
            ),
            friday: taskActivityGroup.find(
              task =>
                task.daySequence === 5 &&
                task.taskDefinitionId === taskDefinition.id
            ),
            saturday: taskActivityGroup.find(
              task =>
                task.daySequence === 6 &&
                task.taskDefinitionId === taskDefinition.id
            ),
            sunday: taskActivityGroup.find(
              task =>
                task.daySequence === 7 &&
                task.taskDefinitionId === taskDefinition.id
            )
          };
          taskActivityMatrix.items.push(item);
          value += this.calculateValue(item);
        });
      taskActivityMatrixList.push(taskActivityMatrix);
    });
    this.taskActivityMatrixList = taskActivityMatrixList;
    this.taskStore.taskWeek.value = value;
  }
  calculateValue(item: TaskActivityItem): number {
    let value = 0;

    value +=
      item.monday.statusId === Constants.ActivityStatus.Complete
        ? item.value
        : 0;
    value +=
      item.tuesday.statusId === Constants.ActivityStatus.Complete
        ? item.value
        : 0;
    value +=
      item.wednesday.statusId === Constants.ActivityStatus.Complete
        ? item.value
        : 0;
    value +=
      item.thursday.statusId === Constants.ActivityStatus.Complete
        ? item.value
        : 0;
    value +=
      item.friday.statusId === Constants.ActivityStatus.Complete
        ? item.value
        : 0;
    value +=
      item.saturday.statusId === Constants.ActivityStatus.Complete
        ? item.value
        : 0;
    value +=
      item.sunday.statusId === Constants.ActivityStatus.Complete
        ? item.value
        : 0;

    return value;
  }
  get canEdit(): boolean {
    return this.taskStore.taskWeek.statusId === Constants.Status.Open;
  }
  save() {
    this.busy.setState(true);
    this.taskStore.saveTaskActivityList().then(() =>
      this.taskStore.saveTaskWeek().then(() => {
        this.busy.setState(false);
      })
    );

  }
  get canSave(): boolean {
    return this.taskStore.taskWeek.statusId === Constants.Status.Open;
  }
  cancel() {
    this.router.navigate(['/']);
  }
  accept() {
    this.busy.setState(true);
    this.taskStore.taskWeek.statusId = Constants.Status.Approved;
    this.taskStore.saveTaskActivityList().then(() =>
      this.taskStore.acceptTaskWeek().then(() => {
        this.busy.setState(false);
        this.router.navigate(['']);
      })
    );

  }
  get canAccept(): boolean {
    return this.taskStore.taskWeek.statusId === Constants.Status.Open && this.accountStore.isParent;
  }
  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }
}
