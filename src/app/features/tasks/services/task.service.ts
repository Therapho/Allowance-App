import { Injectable } from '@angular/core';
import { Observable, throwError} from 'rxjs';
import {map} from 'rxjs/operators';
import { TaskWeek } from '../entities/task-week';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { TaskDefinition } from '../entities/task-definition';
import { TaskActivity } from '../entities/task-activity';
import { TaskDay } from '../entities/task-day';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {


  constructor(private client: HttpClient) { }

  putTaskWeek(taskWeek: TaskWeek): Observable<number> {
    const id = taskWeek.id ? taskWeek.id.toString() : '';

    return this.client.put(environment.dataApiUrl + 'taskweekset/' + id, taskWeek).pipe(
      map( returnId => +returnId),
      catchError(this.handleError));
  }
  putTaskDay(taskDay: TaskDay): Observable<number> {
    const id = taskDay.id ? taskDay.id.toString() : '';

    return this.client.put(environment.dataApiUrl + 'taskdayset/' + id, taskDay).pipe(
      map( returnId => +returnId),
      catchError(this.handleError));
  }
  getTaskWeekList(accountId: number, startDate: Date, endDate?: Date): Observable<TaskWeek[]> {
    const parameters = new HttpParams().set('accountid', accountId.toString()).set('startdate', startDate.toISOString());
    if (endDate) { parameters.set('enddate', endDate.toISOString()); }
    const options = {params: parameters};
    return this.client.get<TaskWeek[]>(environment.dataApiUrl + 'taskweekset', options).pipe(
      map((list: TaskWeek[]) => list.map(data => {
        const taskWeek: TaskWeek = {
          id: +data.id, weekStartDate: new Date(data.weekStartDate),
          statusId: +data.statusId, value: +data.value, accountId: +data.accountId, daysCompleted: +data.daysCompleted
        };
        return taskWeek; })
        ),
      catchError(this.handleError));
  }
  getTaskDayList(accountId: number, taskWeekId: number): Observable<TaskDay[]> {
    const options = {params: new HttpParams().set('accountid', accountId.toString()).set('taskweekid', taskWeekId.toString()) };
    return this.client.get<TaskDay[]>(environment.dataApiUrl + 'taskdayset', options).pipe(
      map((list: TaskDay[]) => list.map(data => {
        const taskDay: TaskDay = {
          id: +data.id, date: new Date(data.date),
          statusId: +data.statusId, value: +data.value, accountId: +data.accountId, taskWeekId: +data.taskWeekId
        };
        return taskDay; })
        ),
      catchError(this.handleError));
  }

  public getTaskDefinitionList(): Observable<TaskDefinition[]> {
    return this.client.get<TaskDefinition[]>(environment.dataApiUrl + 'taskdefinitionset').pipe(
      catchError(this.handleError));
  }
  public getTaskActivityByDay(dayId: number): Observable<TaskActivity[]> {
    const options = {params: new HttpParams().set('taskactivityid', dayId.toString()) };
    return this.client.get<TaskActivity[]>(environment.dataApiUrl + 'taskactivityset', options).pipe(
      catchError(this.handleError));
  }

  private handleError(err) {
    let errorMessage: string;

    if (err && err.error && err.error.message) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      if (err && err.message) {
        errorMessage = `An error occurred: ${err.message}`;
      } else {
        errorMessage = 'An error occured.';
      }
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
