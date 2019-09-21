import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Account } from '../../entities/account';
import { environment } from '../../../../environments/environment';
import { Lookup } from '../../entities/lookup';
import { MsalService } from '@azure/msal-angular';
import { Transaction } from 'src/app/features/profile/types/transaction';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private client: HttpClient, private authService: MsalService) {}


  public getAccount(userIdentifier: string): Promise<Account> {
    const parameters = new HttpParams().set('useridentifier', userIdentifier);
    const options = {params: parameters};

    return new Promise<Account>((resolve, reject) => {
      this.client.get<Account[]>(environment.dataApiUrl + '/accountset' , options).toPromise()
      .then(accountList => resolve(accountList[0]))
      .catch(error => reject(error));
    });

  }
  getAccountList(): Promise<Account[]> {
    return new Promise<Account[]>((resolve, reject) => {
      this.client.get<Account[]>(environment.dataApiUrl + '/accountset').pipe(
        map((list: Account[]) => list.map(data => {
          return Account.map(data);
        }))
      ).toPromise()
      .then(accountList => resolve(accountList))
      .catch(error => reject(error));
    });
  }
  updateBalance(transaction: Transaction): Promise<any> {
    return this.client.post(environment.dataApiUrl + '/updatebalance', transaction).toPromise();
  }
  public getTaskGroupList(): Promise < Lookup[] > {
    return new Promise<Lookup[]>((resolve, reject) => {
      this.client.get<Lookup[]>(environment.dataApiUrl + '/lookups/taskgroupset').toPromise()
      .then(lookup => resolve(lookup))
      .catch(error => reject(error));
    });
  }

  public getRoleList(): Promise < Lookup[] > {
    return new Promise<Lookup[]>((resolve, reject) => {
      this.client.get<Lookup[]>(environment.dataApiUrl + '/lookups/roleset').toPromise()
      .then(lookup => resolve(lookup))
      .catch(error => reject(error));
    });
  }

  public getStatusList(): Promise < Lookup[] > {
    return new Promise<Lookup[]>((resolve, reject) => {
      this.client.get<Lookup[]>(environment.dataApiUrl + '/lookups/statusset').toPromise()
      .then(lookup => resolve(lookup))
      .catch(error => reject(error));
    });

  }
  public getActivityStatusList(): Promise < Lookup[] > {
    return new Promise<Lookup[]>((resolve, reject) => {
      this.client.get<Lookup[]>(environment.dataApiUrl + '/lookups/activitystatusset').toPromise()
      .then(lookup => resolve(lookup))
      .catch(error => reject(error));
    });
  }
}
