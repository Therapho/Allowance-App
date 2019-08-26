import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { AccountStore } from 'src/app/core/stores/account.store';
import { DateUtilities } from 'src/app/core/utilities/dateUtilities';
import { TaskStore } from '../../stores/task.store';
import { LookupStore } from 'src/app/core/stores/lookup.store';

@Component({
  selector: 'app-day-list-view',
  templateUrl: './day-list-view.component.html',
  styleUrls: ['./day-list-view.component.scss']
})
export class DayListViewComponent implements OnInit, OnDestroy {

  public selectedDate: Date;

  constructor(public accountStore: AccountStore, public taskStore: TaskStore, public lookUpStore: LookupStore) {  }

  ngOnInit() {
    this.selectedDate = DateUtilities.getMonday(new Date());
    this.taskStore.loadData(this.accountStore.state.id, this.selectedDate);
  }

  ngOnDestroy() {

  }
}
