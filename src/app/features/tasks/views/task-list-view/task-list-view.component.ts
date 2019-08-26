import { Component, OnInit } from '@angular/core';
import { LookupStore } from 'src/app/core/stores/lookup.store';
import { TaskDefinitionListStore } from '../../stores/task-definition-list.store';
import { TaskStore } from '../../stores/task.store';

@Component({
  selector: 'app-task-list-view',
  templateUrl: './task-list-view.component.html',
  styleUrls: ['./task-list-view.component.scss']
})
export class TaskListViewComponent implements OnInit {

  constructor(
    public lookupStore: LookupStore,
    public taskStore: TaskStore
  ) { }

  ngOnInit() {
    // this.taskDefinitionListStore.loadData();
  }

}
