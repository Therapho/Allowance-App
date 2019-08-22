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

  private get options() {
    const token = localStorage.getItem('access_token');

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    };
    return httpOptions;
  }
  public getAccount(email: string): Observable<Account> {
    return this.client
      .get<Account>(
        environment.dataApiUrl + 'accountset/' + email,
        this.options
        // + '?code=CatMggsxJAX7p1zhNXJK2w8taRanpEVPXc3J8J1EHdRLmHnuMEVfDA=='
      )
      .pipe(catchError(this.handleError));
  }
  public getTaskGroupList(): Observable<Lookup[]> {
    return this.client
      .get<Lookup[]>(
        environment.dataApiUrl + 'lookups/taskgroupset',
        this.options
      )
      .pipe(catchError(this.handleError));
  }

  public getRoleList(): Observable<Lookup[]> {
    return this.client
      .get<Lookup[]>(environment.dataApiUrl + 'lookups/roleset', this.options)
      .pipe(catchError(this.handleError));
  }
  public getStatusList(): Observable<Lookup[]> {
    return this.client
      .get<Lookup[]>(environment.dataApiUrl + 'lookups/statusset', this.options)
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
