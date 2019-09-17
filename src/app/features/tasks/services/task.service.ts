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
  getTaskWeek(taskWeekId: number): Promise<TaskWeek> {
    const parameters = new HttpParams().set('taskweekid', taskWeekId.toString());
    const options = {params: parameters};

    return new Promise<TaskWeek>((resolve, reject) => {
      this.client.get<TaskWeek[]>(environment.dataApiUrl + '/taskweekset', options).toPromise()
      .then(taskWeekList => {
        if (taskWeekList.length === 0) {
          resolve(null);
        } else {
          resolve(taskWeekList[0]);
        }
      })
      .catch (error => reject(error));
    });

  }
  getTaskWeeks(startDate: Date, endDate: Date) {
    const parameters = new HttpParams().set('startdate', startDate.toISOString()).set('endDate', endDate.toISOString());
    const options = {params: parameters};

    return new Promise<TaskWeek[]>((resolve, reject) => {
      this.client.get<TaskWeek[]>(environment.dataApiUrl + '/taskweekset', options).toPromise()
      .then(taskWeekList => resolve(taskWeekList))
      .catch(error => reject(error));
    });

  }
  getOrCreateTaskActivityList(userIdentifier: string, taskWeekId: number): Promise<TaskActivity[]> {
    const parameters = new HttpParams().set('taskweekid', taskWeekId.toString()).set('useridentifier', userIdentifier);
    const options = {params: parameters};

    return this.client.get<TaskActivity[]>(environment.dataApiUrl + '/getorcreatetaskactivitylist', options).pipe(
      map((list: TaskActivity[]) => list.map(data => {
        const taskActivity: TaskActivity = {
          id: +data.id,
          taskGroupId: data.taskGroupId,
          taskDayId: +data.taskDayId,
          sequence: +data.sequence,
          taskWeekId: +data.taskWeekId,
          statusId: +data.statusId,
          taskDefinitionId: +data.taskDefinitionId,
          daySequence: +data.daySequence,
          userIdentifier: data. userIdentifier
        };
        return taskActivity; })
        ),
      catchError(this.handleError)).toPromise();
  }
  getOrCreateTaskWeek(userIdentifier: string, startDate: Date): Promise<TaskWeek> {
    const parameters = new HttpParams().set('useridentifier', userIdentifier).set('startdate', startDate.toISOString());

    const options = {params: parameters};
    return this.client.get<TaskWeek>(environment.dataApiUrl + '/getorcreatetaskweek', options).pipe(
      map((data: TaskWeek) => {
        const taskWeek: TaskWeek = {
          id: +data.id, weekStartDate: new Date(data.weekStartDate),
          statusId: +data.statusId, value: +data.value, userIdentifier: data.userIdentifier
        };
        return taskWeek; }
      ),
      catchError(this.handleError)).toPromise();
  }
  putTaskActivityList(taskActivityList: TaskActivity[]) {
    return this.client.put(environment.dataApiUrl + '/taskactivityset' ,  taskActivityList).toPromise();
  }
  getTaskActivityListByWeek(userIdentifier: string, taskWeekId: number) {
    const parameters = new HttpParams().set('taskweekid', taskWeekId.toString()).set('useridentifier', userIdentifier);
    const options = {params: parameters};
    return this.client.get<TaskActivity[]>(environment.dataApiUrl + '/taskactivityset', options).pipe(
      map((list: TaskActivity[]) => list.map(data => {
        const taskWeek: TaskActivity = {
          id: +data.id,
          taskGroupId: data.taskGroupId,
          userIdentifier: data.userIdentifier,
          taskDayId: +data.taskDayId,
          sequence: +data.sequence,
          taskWeekId: +data.taskWeekId,
          statusId: +data.statusId,
          taskDefinitionId: +data.taskDefinitionId,
          daySequence: +data.daySequence
        };
        return taskWeek; })
        ),
      catchError(this.handleError)).toPromise();
  }


  constructor(private client: HttpClient) { }

  putTaskWeek(taskWeek: TaskWeek): Promise<number> {
    const id = taskWeek.id ? taskWeek.id.toString() : '';

    return this.client.put(environment.dataApiUrl + '/taskweekset/' + id, taskWeek).pipe(
      map( returnId => +returnId),
      catchError(this.handleError)).toPromise();
  }
  putTaskDay(taskDay: TaskDay): Promise<number> {
    const id = taskDay.id ? taskDay.id.toString() : '';

    return this.client.put(environment.dataApiUrl + '/taskdayset/' + id, taskDay).pipe(
      map( returnId => +returnId),
      catchError(this.handleError)).toPromise();
  }
  getTaskWeekList(userIdentifier: string, startDate: Date, endDate?: Date): Promise<TaskWeek[]> {
    const parameters = new HttpParams().set('useridentifier', userIdentifier).set('startdate', startDate.toISOString());
    if (endDate) { parameters.set('enddate', endDate.toISOString()); }
    const options = {params: parameters};
    return this.client.get<TaskWeek[]>(environment.dataApiUrl + '/taskweekset', options).pipe(
      map((list: TaskWeek[]) => list.map(data => {
        const taskWeek: TaskWeek = {
          id: +data.id, weekStartDate: new Date(data.weekStartDate),
          statusId: +data.statusId, value: +data.value, userIdentifier: data.userIdentifier
        };
        return taskWeek; })
        ),
      catchError(this.handleError)).toPromise();
  }
  getTaskDayList(userIdentifier: string, taskWeekId: number): Promise<TaskDay[]> {
    const options = {params: new HttpParams().set('useridentifier', userIdentifier).set('taskweekid', taskWeekId.toString()) };
    return this.client.get<TaskDay[]>(environment.dataApiUrl + '/taskdayset', options).pipe(
      map((list: TaskDay[]) => list.map(data => {
        const taskDay: TaskDay = {
          id: +data.id, date: new Date(data.date),
          statusId: +data.statusId, value: +data.value, userIdentifier: data.userIdentifier, taskWeekId: +data.taskWeekId
        };
        return taskDay; })
        ),
      catchError(this.handleError)).toPromise();
  }

  public getTaskDefinitionList(): Promise<TaskDefinition[]> {
    return this.client.get<TaskDefinition[]>(environment.dataApiUrl + '/taskdefinitionset').pipe(
      catchError(this.handleError)).toPromise();
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
