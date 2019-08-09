import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Account } from '../../entities/account';
import { AppConfig } from 'src/app/shared/app.config';
import { Role } from '../../entities/Role';
import { TaskGroup } from '../../entities/task-group';
import { TaskWeek } from 'src/app/features/tasks/entities/task-week';
import { TaskDefinition } from 'src/app/features/tasks/entities/task-definition';
import { TaskActivity } from 'src/app/features/tasks/entities/task-activity';
import { Lookup } from '../../entities/lookup';

@Injectable({
  providedIn: 'root'
})
export class DataService {


  constructor(private client: HttpClient) { }

  public getAccount(email: string): Observable<Account> {
    return this.client.get<Account>(AppConfig.DATA_API_URL + 'accountset/' + email).pipe(
      catchError(this.handleError));

  }
  public getTaskGroupList(): Observable<Lookup[]> {
    return this.client.get<Lookup[]>(AppConfig.DATA_API_URL + 'lookups/taskgroupset').pipe(
      catchError(this.handleError));
  }

  public getRoleList(): Observable<Lookup[]> {
    return this.client.get<Lookup[]>(AppConfig.DATA_API_URL + 'lookups/roleset').pipe(
      catchError(this.handleError));
  }
  public getStatusList(): Observable<Lookup[]> {
    return this.client.get<Lookup[]>(AppConfig.DATA_API_URL + 'lookups/statusset').pipe(
      catchError(this.handleError));
  }

  private handleError(err) {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent || err.error instanceof ProgressEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}
