import { Component, OnInit } from '@angular/core';
import { TaskWeekListStore } from '../../stores/task-week-list.store';
import { DateUtilities } from 'src/app/core/utilities/dateUtilities';
import { LookupStore } from 'src/app/core/stores/lookup.store';
import { AccountStore } from 'src/app/core/stores/account.store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-week-list-view',
  templateUrl: './task-week-list-view.component.html',
  styleUrls: ['./task-week-list-view.component.scss']
})
export class TaskWeekListViewComponent implements OnInit {
  selectedDate: any;

  constructor(
    public taskWeekListStore: TaskWeekListStore,
    public lookupStore: LookupStore,
    public accountStore: AccountStore,
    public router: Router
  ) { }

  ngOnInit() {
    if (!this.accountStore.isParent) {
      this.router.navigate(['details']);
    }

    this.selectedDate = DateUtilities.getMonday(new Date());

    this.taskWeekListStore.loadData(this.selectedDate, DateUtilities.addDays(this.selectedDate, 30 ));
  }

}
