import { Injectable } from '@angular/core';
import { DataService } from '../services/data-service/data.service';
import { Store } from '../types/store';
import { Lookup } from '../entities/lookup';

@Injectable({
  providedIn: 'root'
})
export class LookupStore {

  constructor(
    private dataService: DataService
  ) {
    this.loadRoles();
    this.loadStatus();
    this.loadTaskGroups();
    this.loadActivityStatus();
  }

  get roles(): Lookup[] {

    return this._roles.state;
  }

  get status(): Lookup[] {

    return this._status.state;
  }

  get activityStatus(): Lookup[] {

    return this._activityStatus.state;
  }

  get taskGroups(): Lookup[] {

    return this._taskGroups.state;
  }
  private _roles: Store<Lookup[]>;
  private _status: Store<Lookup[]>;
  private _taskGroups: Store<Lookup[]>;
  private _activityStatus: Store<Lookup[]>;


  loadRoles() {
    this._roles = new Store<Lookup[]>(null);
    this.dataService.getRoleList().subscribe(
      (data: Lookup[]) =>
        this._roles.setState(data));
  }

  loadStatus() {
    this._status = new Store<Lookup[]>(null);
    this.dataService.getStatusList().subscribe(
      (data: Lookup[]) =>
        this._status.setState(data));
  }

  loadActivityStatus() {
    this._activityStatus = new Store<Lookup[]>(null);
    this.dataService.getActivityStatusList().subscribe(
      (data: Lookup[]) =>
        this._activityStatus.setState(data));
  }


  loadTaskGroups() {
    this._taskGroups = new Store<Lookup[]>(null);
    this.dataService.getTaskGroupList().subscribe(
      (data: Lookup[]) =>
        this._taskGroups.setState(data));
  }
  getName(id: number, lookupName: string) {

    return this.findLookup(lookupName).find(item => item.id === id).name;
  }
  getId(name: string, lookupName: string) {
    return this.findLookup(lookupName).find(item => item.name === name).id;
  }
  private findLookup(lookupName: string) {
    let lookup: Lookup[] = null;
    switch (lookupName) {

      case 'ActivityStatus':
        lookup = this.activityStatus;
        break;
    }
    return lookup;
  }
}
