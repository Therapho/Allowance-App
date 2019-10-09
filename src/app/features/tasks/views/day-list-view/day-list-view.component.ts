import { Component, OnInit, OnDestroy } from '@angular/core';
import { AccountStore } from 'src/app/core/stores/account.store';
import { DateUtilities } from 'src/app/core/utilities/dateUtilities';
import { TaskStore } from '../../stores/task.store';
import { LookupStore } from 'src/app/core/stores/lookup.store';

import { TaskActivityMatrix } from '../../entities/task-activity-matrix';
import { TaskActivityItem } from '../../entities/task-activity-item';
import { Constants } from 'src/app/core/common/constants';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, Observable, BehaviorSubject } from 'rxjs';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from 'src/app/core/components/confirmation-dialog/confirmation-dialog.component';
import { MessageService } from 'src/app/core/services/message-service/message.service';


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
    private dialog: MatDialog,
    private messageService: MessageService
  ) { }
  public selectedDate: Date;
  public busy$: BehaviorSubject<boolean>;
    public busy: Observable<boolean>;


  ngOnInit() {
    // const taskWeekId = this.route.snapshot.paramMap.get('id');
    // this.loadData(taskWeekId);
    this.busy$ = new BehaviorSubject(false);
    this.busy = this.busy$.asObservable();

    this.routeSubscription = this.route.paramMap.subscribe(params => {
      this.busy$.next(true);
      this.loadData(params.get('id'))
        .catch(error => {
          this.messageService.addError('Error loading data for task list.', error.message);
        })
        .finally(() => this.busy$.next(false));
    });
  }
  loadData(taskWeekId): Promise<any> {

    return new Promise<any>((resolve, reject) => {
      if (taskWeekId) {
        this.taskStore.loadDataForTaskWeek(+taskWeekId).then(() => {
          resolve();
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
            resolve();
          }).catch(reason => reject(reason));
      }
    });

  }

  get canEdit(): boolean {
    return this.taskStore.taskWeek.statusId === Constants.Status.Open;
  }
  save() {
    this.busy$.next(true);
    this.taskStore.saveTaskActivityList()
      .then(() => {

        this.taskStore.saveTaskWeek().then(() => {
          this.busy$.next(false);
          this.messageService.addInfo('Tasks saved.', 'Tasks for the week have been successfully saved.');
          this.router.navigate(['/profile']);
        });
      }).catch(error => {
        this.messageService.addError('Error saving task list data.', error.message);
      });
  }
  get canSave(): boolean {
    return this.taskStore.taskWeek.statusId === Constants.Status.Open;
  }
  cancel() {
    this.router.navigate(['/profile']);
  }
  accept() {
    this.confirm('This will finalize this week\'s tasks, and allowance, locking this list.  Are you sure?')
      .then(response => {
        if (response === true) {
          this.busy$.next(true);
          this.taskStore.taskWeek.statusId = Constants.Status.Approved;
          this.taskStore.saveTaskActivityList().then(() =>
            this.taskStore.acceptTaskWeek().then(() => {
              this.busy$.next(false);
              this.router.navigate(['/profile']);
            })
          );
        }
      });


  }
  get canAccept(): boolean {
    const endOfWeek = DateUtilities.addDays(this.taskStore.taskWeek.weekStartDate, 0);
    const today = new Date();
    const canAccept = this.taskStore.taskWeek.statusId === Constants.Status.Open && this.accountStore.isParent && today >= endOfWeek;

    return canAccept;
  }
  async confirm(message: string): Promise<boolean> {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      message
    };

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, dialogConfig);
    let result = false;

    await dialogRef.afterClosed().toPromise().then(response => result = response);
    return result;
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }
}
