import { Injectable } from '@angular/core';
import { DataService } from '../services/data-service/data.service';
import { Store } from '../types/store';
import { Lookup } from '../entities/lookup';

@Injectable({
  providedIn: 'root'
})
export class LookupStore {
  private _roles: Store<Lookup[]>;
  private _status: Store<Lookup[]>;
  private _taskGroups: Store<Lookup[]>;

  constructor(
    private dataService: DataService
  ) {
     this.loadRoles();
     this.loadStatus();
     this.loadTaskGroups();
    }

  get roles(): Lookup[] {

    return this._roles.state;
  }

  loadRoles() {
    this._roles = new Store<Lookup[]>(null);
    this.dataService.getRoleList().subscribe(
      (data: Lookup[]) =>
      this._roles.setState(data));
  }

  get status(): Lookup[] {

    return this._status.state;
  }

  loadStatus() {
    this._status = new Store<Lookup[]>(null);
    this.dataService.getStatusList().subscribe(
      (data: Lookup[]) =>
      this._status.setState(data));
  }

  get taskGroups(): Lookup[] {

    return this._taskGroups.state;
  }


  loadTaskGroups() {
    this._taskGroups = new Store<Lookup[]>(null);
    this.dataService.getTaskGroupList().subscribe(
      (data: Lookup[]) =>
      this._taskGroups.setState(data));
  }
}
