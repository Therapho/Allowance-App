import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Account } from '../../entities/account';
import { environment } from '../../../../environments/environment';
import { Lookup } from '../../entities/lookup';
import { MsalService } from '@azure/msal-angular';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private client: HttpClient, private authService: MsalService) {}


  public getAccount(email: string): Observable<Account> {
    return this.client
      .get<Account>(
        environment.dataApiUrl + 'accountset/' + email
      )
      .pipe(catchError(this.handleError));
  }
  public getTaskGroupList(): Observable<Lookup[]> {
    return this.client
      .get<Lookup[]>(
        environment.dataApiUrl + 'lookups/taskgroupset'     )
      .pipe(catchError(this.handleError));
  }

  public getRoleList(): Observable<Lookup[]> {
    return this.client
      .get<Lookup[]>(environment.dataApiUrl + 'lookups/roleset')
      .pipe(catchError(this.handleError));
  }
  public getStatusList(): Observable<Lookup[]> {
    return this.client
      .get<Lookup[]>(environment.dataApiUrl + 'lookups/statusset')
      .pipe(catchError(this.handleError));
  }
  public getActivityStatusList(): Observable<Lookup[]> {
    return this.client
      .get<Lookup[]>(environment.dataApiUrl + 'lookups/activitystatusset')
      .pipe(catchError(this.handleError));
  }
  private handleError(err) {
    let errorMessage: string;

    if (err) {
      errorMessage = err;
    } else if (err.error && err.error.message) {
      errorMessage = err.error.message;
    } else if (err.message) {
      errorMessage = err.message;
    }

    console.log(`An error occurred: ${errorMessage}`);
    return throwError(errorMessage);
  }
}
