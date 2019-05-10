import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsersObject } from '../../../api-objects/UsersObject';
import { ServerApiService } from './server-api.service';
import { Response } from '../../../api-objects/GenericResponse';

@Injectable()
export class ApiUsersCrudService {

  constructor(private serverApiService: ServerApiService) { }

  public createUser(obj: UsersObject): Observable<Response<string>> {
    return this.serverApiService.post<string>('create_user', obj);
  }

  public getUsers(): Observable<Response<UsersObject[]>> {
    return this.serverApiService.get<UsersObject[]>('get_users');
  }

  public changePassword(obj: UsersObject): Observable<Response<UsersObject>> {
    return this.serverApiService.post<UsersObject>('change_password', obj);
  }

  public deleteUser(username: string): Observable<Response<UsersObject>> {
    return this.serverApiService.delete<UsersObject>('del_user', new Map<string, string>([['name', username]]));
  }
}
