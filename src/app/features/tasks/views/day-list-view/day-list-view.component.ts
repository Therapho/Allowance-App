import { Component, OnInit, OnDestroy } from '@angular/core';
import { TaskWeek } from '../../entities/task-week';
import { Subject } from 'rxjs';
import { AccountStore } from 'src/app/core/stores/account.store';
import { TaskService } from '../../services/task.service';
import { takeUntil } from 'rxjs/operators';
import { TaskDay } from '../../entities/task-day';
import { LookupStore } from 'src/app/core/stores/lookup.store';

@Component({
  selector: 'app-day-list-view',
  templateUrl: './day-list-view.component.html',
  styleUrls: ['./day-list-view.component.scss']
})
export class DayListViewComponent implements OnInit, OnDestroy {
  public taskWeek: TaskWeek;
  public selectedDate: Date;
  public errorMessage: string;
  taskDayList: any[];
  private unsubscribe: Subject<void> = new Subject();

  constructor(
    public accountStore: AccountStore,
    public lookupStore: LookupStore,
    private taskService: TaskService
  ) {}

  ngOnInit() {
    this.selectedDate = this.getMonday(new Date());
    this.loadData();
  }

  private  loadData() {
     this.taskService
      .getTaskWeekList(this.accountStore.state.id, this.selectedDate)
      .subscribe(
        taskWeekList => {
          this.processLoadedTaskWeeks(taskWeekList);
          if (this.taskWeek && this.taskWeek.id) {
            this.taskService
              .getTaskDayList(this.accountStore.state.id, this.taskWeek.id)
              .pipe(takeUntil(this.unsubscribe))
              .subscribe(
                taskDayList => this.processLoadedTaskDays(taskDayList),
                error => this.handleError(error)
              );
          }},
        error => this.handleError(error)
      );


  }
  getMonday(d): Date {
    d = new Date(d);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff));
  }
  processLoadedTaskWeeks(taskWeekList: TaskWeek[]) {
    if (taskWeekList && taskWeekList.length > 0) {
      this.taskWeek = taskWeekList[0];
    } else {
      this.createNewTaskWeek();
    }
  }
  processLoadedTaskDays(taskDayList: TaskDay[]) {
    if (taskDayList && taskDayList.length > 0) {
      this.taskDayList = taskDayList;
    } else {
      this.createNewTaskDayList();
    }
  }

  createNewTaskDayList() {
    const taskDayList: TaskDay[] = [];
    const accountId = this.accountStore.state.id;
    const startDate: Date = this.taskWeek.weekStartDate;
    const taskWeekId = this.taskWeek.id;

    for (let index = 0; index < 7; index++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + index);

      const taskDay: TaskDay = {
        id: null,
        accountId,
        date,
        statusId: 1,
        taskWeekId,
        value: 0
      };
      this.taskService
        .putTaskDay(taskDay)
        .pipe(takeUntil(this.unsubscribe))
        .subscribe(
          id => {
            taskDay.id = id;
            taskDayList.push(taskDay);
          },
          error => this.handleError(error)
        );

    }
    this.taskDayList = taskDayList;
  }
  handleError(error: Error) {
    this.errorMessage = error as any;
  }

  async createNewTaskWeek() {
    const accountId = this.accountStore.state.id;

    const taskWeek: TaskWeek = {
      id: null,
      weekStartDate: this.selectedDate,
      statusId: 1,
      daysCompleted: 0,
      accountId,
      value: 0
    };

    await this.taskService.putTaskWeek(taskWeek).subscribe(
      id => {
        taskWeek.id = id;
      },
      error => this.handleError(error)
    );
  }
  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
