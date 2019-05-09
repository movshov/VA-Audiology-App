import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserResponse } from 'api-objects/userResponse';
import { ServerApiService } from './server-api.service';
import { Response } from '../../../api-objects/GenericResponse';
import { stringify } from '@angular/core/src/util';

export type userType = 'Admin' | 'Audiologist';

@Injectable()
export class ApiUsersCrudService {

  constructor(private serverApiService: ServerApiService) { }

  public createUser(username: userType): Observable<Response<UserResponse>> {
    return this.serverApiService.post<UserResponse>('createUser', username);
  }

  public getUsers(): Observable<Response<UserResponse[]>> {
    return this.serverApiService.get<UserResponse[]>('users', new Map<string, string>([['name', 'all']]));
  }

  public getUser(username: string): Observable<Response<UserResponse>> {
    return this.serverApiService.get<UserResponse>('users', new Map<string, string>([['name', username]]));
  }

  public changePassword(username: string, password: string): Observable<Response<UserResponse>> {
    return this.serverApiService.post<UserResponse>('changePassword', {'username': username, 'password': password});
  }

  public deleteUser(username: string): Observable<Response<UserResponse>> {
    return this.serverApiService.delete<UserResponse>('deleteUser', new Map<string, string>([['name', username]]));
  }
}
