import { Component, OnInit, OnDestroy } from '@angular/core';
import { TaskWeek } from '../../entities/task-week';
import { Subject } from 'rxjs';
import { AccountStore } from 'src/app/core/stores/account.store';
import { TaskService } from '../../services/task.service';
import { takeUntil } from 'rxjs/operators';
import { TaskDay } from '../../entities/task-day';
import { LookupStore } from 'src/app/core/stores/lookup.store';
import { DateUtilities } from 'src/app/core/utilities/dateUtilities';
import { TaskWeekStore } from '../../stores/task-week.store';
import { TaskDayListStore } from '../../stores/task-day-list.store';

@Component({
  selector: 'app-day-list-view',
  templateUrl: './day-list-view.component.html',
  styleUrls: ['./day-list-view.component.scss']
})
export class DayListViewComponent implements OnInit, OnDestroy {

  public selectedDate: Date;
  public errorMessage: string;
  private unsubscribe: Subject<void> = new Subject();

  constructor(
    public accountStore: AccountStore,
    public lookupStore: LookupStore,
    public taskWeekStore: TaskWeekStore,
    public taskDayListStore: TaskDayListStore
  ) {

  }

  ngOnInit() {
    this.selectedDate = DateUtilities.getMonday(new Date());



    this.taskWeekStore.loadData(this.accountStore.state.id, this.selectedDate).then(
      taskWeek => {
        this.taskDayListStore.loadData(this.accountStore.state.id, taskWeek.id, this.selectedDate);
      }
    );
  }

  handleError(error: Error) {
    this.errorMessage = error as any;
  }


  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
