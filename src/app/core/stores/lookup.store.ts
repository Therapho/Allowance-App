import { Injectable } from '@angular/core';
import { DataService } from '../services/data-service/data.service';
import { Store } from '../types/store';
import { Lookup } from '../entities/lookup';

@Injectable({
  providedIn: 'root'
})
export class LookupStore {
  _transactionCategories: Store<Lookup[]>;


  constructor(
    private dataService: DataService
  ) {
    this.loadRoles();
    this.loadStatus();
    this.loadTaskGroups();
    this.loadActivityStatus();
    this.loadTransactionCategories();
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
  get transactionLogCategories(): Lookup[] {
    return this._transactionCategories.state;
  }

  private _roles: Store<Lookup[]>;
  private _status: Store<Lookup[]>;
  private _taskGroups: Store<Lookup[]>;
  private _activityStatus: Store<Lookup[]>;


  loadRoles() {
    this._roles = new Store<Lookup[]>(null);

    this.dataService.getRoleList().then(
      (data: Lookup[]) => {
        this._roles.setState(data);
      });
  }

  loadStatus() {
    this._status = new Store<Lookup[]>(null);

    this.dataService.getStatusList().then(
        (data: Lookup[]) => {
          this._status.setState(data);

        });

  }

  loadActivityStatus() {
    this._activityStatus = new Store<Lookup[]>(null);

    this.dataService.getActivityStatusList().then(
        (data: Lookup[]) => {
          this._activityStatus.setState(data);

        });

  }


  loadTaskGroups() {
    this._taskGroups = new Store<Lookup[]>(null);
    this.dataService.getTaskGroupList().then(
        (data: Lookup[]) => {
          this._taskGroups.setState(data);

        });

  }
  loadTransactionCategories() {
    this._transactionCategories = new Store<Lookup[]>(null);
    this.dataService.getTransactionCategoryList().then(
        (data: Lookup[]) => {
          this._transactionCategories.setState(data);

        });
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
      case 'TransactionLogCategory':
        lookup = this.transactionLogCategories;
        break;
    }
    return lookup;
  }
}
