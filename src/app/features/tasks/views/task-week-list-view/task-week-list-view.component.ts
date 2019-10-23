import { Component, OnInit } from '@angular/core';
import { TaskWeekListStore } from '../../stores/task-week-list.store';
import { DateUtilities } from 'src/app/core/utilities/dateUtilities';
import { LookupStore } from 'src/app/core/stores/lookup.store';
import { AccountStore } from 'src/app/core/stores/account.store';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/core/services/message-service/message.service';
import { BusyService } from 'src/app/core/services/busy-service/busy.service';

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
    public router: Router,
    private messageService: MessageService,
    private busy: BusyService
  ) { }

  ngOnInit() {
    if (!this.accountStore.isParent) {
      this.router.navigate(['tasks/details']);
    }

    this.selectedDate = DateUtilities.getMonday(new Date());

    this.busy.setState(true);
    this.taskWeekListStore.loadData(this.selectedDate, DateUtilities.addDays(this.selectedDate, 30 ))
    .catch(error => {
      this.messageService.addError('Error loading data for task week list.', error);
    })
    .finally(() => {
      this.busy.setState(false);
    });
  }

}
