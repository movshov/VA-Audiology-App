import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserResponse } from '../../../api-objects/userResponse';
import { ServerApiService } from './server-api.service';
import { Response } from '../../../api-objects/GenericResponse';
import { userType } from '../../../api-objects/Types';

@Injectable()
export class ApiUsersCrudService {

  constructor(private serverApiService: ServerApiService) { }

  public createUser(username: string, uType: userType): Observable<Response<UserResponse>> {
    return this.serverApiService.post<UserResponse>('users', {'req': 'create', 'username': username, 'type': uType});
  }

  public getUsers(): Observable<Response<UserResponse[]>> {
    return this.serverApiService.get<UserResponse[]>('users');
  }

  public changePassword(username: string, password: string): Observable<Response<UserResponse>> {
    return this.serverApiService.post<UserResponse>('users', {'req': 'changePW', 'username': username, 'password': password});
  }

  public deleteUser(username: string): Observable<Response<UserResponse>> {
    return this.serverApiService.delete<UserResponse>('users', new Map<string, string>([['name', username]]));
  }
}
