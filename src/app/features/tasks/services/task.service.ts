import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { TaskWeek } from '../entities/task-week';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { TaskDefinition } from '../entities/task-definition';
import { TaskActivity } from '../entities/task-activity';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(private client: HttpClient) {}

  getTaskWeek(taskWeekId: number): Promise<TaskWeek> {
    const parameters = new HttpParams().set(
      'taskweekid',
      taskWeekId.toString()
    );
    const options = { params: parameters };

    return new Promise<TaskWeek>((resolve, reject) => {
      this.client
        .get<TaskWeek[]>(environment.dataApiUrl + '/taskweekset', options)
        .pipe(map((list: TaskWeek[]) => list.map(data => TaskWeek.map(data))))
        .toPromise()
        .then(taskWeekList => {
          if (taskWeekList.length === 0) {
            resolve(null);
          } else {
            resolve(taskWeekList[0]);
          }
        })
        .catch(error => reject(error));
    });
  }
  getTaskWeeks(startDate: Date, endDate: Date) {
    const parameters = new HttpParams()
      .set('startdate', startDate.toISOString())
      .set('endDate', endDate.toISOString());
    const options = { params: parameters };

    return this.client
      .get<TaskWeek[]>(environment.dataApiUrl + '/taskweekset', options)
      .pipe(map((list: TaskWeek[]) => list.map(data => TaskWeek.map(data))))
      .toPromise();
  }
  getOrCreateTaskActivityList(
    userIdentifier: string,
    taskWeekId: number
  ): Promise<TaskActivity[]> {
    const parameters = new HttpParams()
      .set('taskweekid', taskWeekId.toString())
      .set('useridentifier', userIdentifier);
    const options = { params: parameters };

    return this.client
      .get<TaskActivity[]>(
        environment.dataApiUrl + '/getorcreatetaskactivitylist',
        options
      )
      .pipe(
        map((list: TaskActivity[]) => list.map(data => TaskActivity.map(data)))
      )
      .toPromise();
  }
  getOrCreateTaskWeek(
    userIdentifier: string,
    startDate: Date
  ): Promise<TaskWeek> {
    const parameters = new HttpParams()
      .set('useridentifier', userIdentifier)
      .set('startdate', startDate.toISOString());

    const options = { params: parameters };
    return this.client
      .get<TaskWeek>(environment.dataApiUrl + '/getorcreatetaskweek', options)
      .pipe(map((data: TaskWeek) => TaskWeek.map(data)))
      .toPromise();
  }
  putTaskActivityList(taskActivityList: TaskActivity[]) {
    return this.client
      .put(environment.dataApiUrl + '/taskactivityset', taskActivityList)
      .toPromise();
  }
  getTaskActivityListByWeek(userIdentifier: string, taskWeekId: number) {
    const parameters = new HttpParams()
      .set('taskweekid', taskWeekId.toString())
      .set('useridentifier', userIdentifier);
    const options = { params: parameters };

    return this.client
      .get<TaskActivity[]>(environment.dataApiUrl + '/taskactivityset', options)
      .pipe(
        map((list: TaskActivity[]) => list.map(data => TaskActivity.map(data)))
      )
      .toPromise();
  }

  putTaskWeek(taskWeek: TaskWeek): Promise<number> {
    const id = taskWeek.id ? taskWeek.id.toString() : '';

    return this.client
      .put(environment.dataApiUrl + '/taskweekset/' + id, taskWeek)
      .pipe(map(returnId => +returnId))
      .toPromise();
  }

  getTaskDefinitionList(): Promise<TaskDefinition[]> {
    return this.client
      .get<TaskDefinition[]>(environment.dataApiUrl + '/taskdefinitionset')
      .pipe(
        map((list: TaskDefinition[]) =>
          list.map(data => TaskDefinition.map(data))
        )
      )
      .toPromise();
  }
  acceptTaskWeek(taskWeek: TaskWeek): Promise<any> {
    return this.client
      .post(environment.dataApiUrl + '/accepttaskweek', taskWeek)
      .pipe(map((data: TaskWeek) => TaskWeek.map(data)))
      .toPromise();
  }
}
