import { Component, OnInit } from '@angular/core';
import { LookupStore } from 'src/app/core/stores/lookup.store';
import { TaskDefinitionStore } from '../../stores/task-definition.store';

@Component({
  selector: 'app-task-list-view',
  templateUrl: './task-list-view.component.html',
  styleUrls: ['./task-list-view.component.scss']
})
export class TaskListViewComponent implements OnInit {

  constructor(
    public lookupStore: LookupStore,
    public taskDefinitionStore: TaskDefinitionStore
  ) { }

  ngOnInit() {
    this.taskDefinitionStore.load();
  }

}
