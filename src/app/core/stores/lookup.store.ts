import { Injectable } from '@angular/core';
import { DataService } from '../services/data-service/data.service';
import { Store } from '../types/store';
import { Lookup } from '../entities/lookup';
import { promise } from 'protractor';

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
    this.loadTransactionLogCategories();

  }
  get roles(): Lookup[] {
    return this._roles;
  }
  get status(): Lookup[] {
    return this._status;
  }
  get taskGroups(): Lookup[] {
    return this._taskGroups;
  }
  get activityStatus(): Lookup[] {
    return this._activityStatus;
  }
  get transactionLogCategories(): Lookup[] {
    return this._transactionLogCategories;
  }

  private _roles: Lookup[];
  private _status: Lookup[];
  private _taskGroups: Lookup[];
  private _activityStatus: Lookup[];
  private _transactionLogCategories: Lookup[];

  private loadTransactionLogCategories() {


        const roleString = localStorage.getItem('transactionLogCategories');
        if (roleString) {
          this._transactionLogCategories = JSON.parse(roleString);

        } else {
          this.dataService.getTransactionCategoryList().then(transactionLogCategories => {
            localStorage.setItem('transactionCategories', JSON.stringify(transactionLogCategories));
            this._transactionLogCategories = transactionLogCategories;

          });
        }
      }



  private loadActivityStatus() {


    const roleString = localStorage.getItem('activityStatus');
    if (roleString) {
      this._activityStatus = JSON.parse(roleString);

    } else {
      this.dataService.getActivityStatusList().then(activityStatus => {
        localStorage.setItem('activityStatus', JSON.stringify(activityStatus));
        this._activityStatus = activityStatus;
      });
    }
  }
  private loadTaskGroups() {


    const roleString = localStorage.getItem('taskGroups');
    if (roleString) {
      this._taskGroups = JSON.parse(roleString);

    } else {
      this.dataService.getTaskGroupList().then(taskGroups => {
        localStorage.setItem('taskGroups', JSON.stringify(taskGroups));
        this._taskGroups = taskGroups;
      });
    }
  }
  private loadStatus() {


    const roleString = localStorage.getItem('status');
    if (roleString) {
      this._status = JSON.parse(roleString);

    } else {
      this.dataService.getStatusList().then(status => {
        localStorage.setItem('status', JSON.stringify(status));
        this._status = status;
      });
    }
  }

  private loadRoles() {


    const roleString = localStorage.getItem('roles');
    if (roleString) {
      this._roles = JSON.parse(roleString);

    } else {
      this.dataService.getRoleList().then(roles => {
        localStorage.setItem('roles', JSON.stringify(roles));
        this._roles = roles;
      });
    }
  }




  getName(id: number, lookupName: string) {
    const lookup = this.findLookup(lookupName);
    return lookup.find(item => item.id === id).name;
  }
  async getId(name: string, lookupName: string) {
    const lookup = await this.findLookup(lookupName);
    return lookup.find(item => item.name === name).id;
  }
  private findLookup(lookupName: string): Lookup[] {
    let lookup: Lookup[] = null;
    switch (lookupName) {

      case 'ActivityStatus':
        lookup = this._activityStatus;
        break;
      case 'TransactionLogCategory':
        lookup = this._transactionLogCategories;
        break;
    }
    return lookup;
  }
}
