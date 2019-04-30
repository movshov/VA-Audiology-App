import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Response } from '../../../api-objects/GenericResponse';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class ServerApiService {
  // TODO: Configure base Url, to point to hosted endpoint. (localhost:3333 isn't a valid endpoint.)

  private baseUrl = 'REPLACE ME';  // URL to web api

  constructor(private http: HttpClient) { }
  
  // Base Function
  public get<T>(urlExtension: string): Observable<Response<T>> {
    return this.http.get<Response<T>>(this.baseUrl + urlExtension, this.createHeaders())
    .pipe(catchError(this.handleError<Response<T>>(urlExtension, null)));
  }

  public post<T>(urlExtension: string, body: any): Observable<Response<T>> {
    return this.http.post<Response<T>>(this.baseUrl + urlExtension, body, this.createHeaders())
      .pipe(catchError(this.handleError<Response<T>>(urlExtension, null)));
  }

  public delete<T>(urlExtension: string): Observable<Response<T>> {
    return this.http.delete<Response<T>>(this.baseUrl + urlExtension, this.createHeaders())
      .pipe(catchError(this.handleError<Response<T>>(urlExtension, null)));

  }

  private createHeaders() {
    return {

      headers: new HttpHeaders({
        'Accept': 'application/json',
        'X-USER-ID': this.getAuthorization(),
        'X-SESSION-ID': this.getSessionId()

      })
    };
  }

  // TODO: Add appropriate authorization that should be collected when a Audiologist or Admin Logs in.
  // TODO: We will pull this into sepperate https interceptor at a future point.
  private getAuthorization(): string {
    return '15';
  }

  private getSessionId(): string {
    return '15';
  }

  /*
  * Handle Http operation that failed.
  * Let the app continue.
  * @param operation - name of the operation that failed
  * @param result - optional value to return as the observable result
  */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
