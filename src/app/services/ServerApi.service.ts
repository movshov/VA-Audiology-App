import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ServerApiService {
  // TODO: Configure base Url, to point to hosted endpoint. (localhost:3333 isn't a valid endpoint.)
  private baseUrl = 'https://jsonplaceholder.typicode.com/todos/1';  // URL to web api

  constructor(private http: HttpClient) { }

  // Base Function
  private getFromDataBase(urlExtension: string): Observable<any> {
    return this.http.get(this.baseUrl + urlExtension, this.createHeaders());
  }

  private createHeaders() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization' : this.generateAuthorizationToken()
      })
    };
  }

  // TODO: Add appropriate authorization that should be collected when a Audiologist or Admin Logs in.
  private generateAuthorizationToken(): string {
    return ' ';
  }
}
