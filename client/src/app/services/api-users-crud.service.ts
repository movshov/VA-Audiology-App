import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsersObject, CreateUserRequest } from '../../../../api-objects/UsersObject';
import { ServerApiService } from './server-api.service';
import { Response } from '../../../../api-objects/GenericResponse';
import { AccountCreateResponse } from '../../../../api-objects/accountCreateResponse';

@Injectable()
export class ApiUsersCrudService {

  constructor(private serverApiService: ServerApiService) { }

  // Response data should be the generated password.
  public createUser(usersObj: CreateUserRequest): Observable<Response<AccountCreateResponse>> {
    return this.serverApiService.post<AccountCreateResponse>('accounts/create', usersObj);
  }

  // Response data should be an array of UsersObject
  public getUsers(): Observable<Response<UsersObject[]>> {
    return this.serverApiService.get<UsersObject[]>('accounts');
  }

  // Response data should be true if password changed
  public changePassword(oldPassword: string, newPassword: string): Observable<Response<boolean>> {
    return this.serverApiService.post<boolean>('changePassword', { oldPassword, newPassword });
  }

  // Response data should be the new generated password
  public resetPassword(username: string): Observable<Response<string>> {
    return this.serverApiService.post<string>('accounts/resetPassword', { username });
  }

  // Response data should be true if user was deleted
  public deleteUser(username: string): Observable<Response<boolean>> {
    return this.serverApiService.delete<boolean>('accounts', new Map<string, string>([['username', username]]));
  }

  // Response data should be null observable if user was deleted
  public updateUsername(username: string, newUsername: string): Observable<Response<null>> {
    return this.serverApiService.post<null>('accounts/changeUsername', { username, 'newusername': newUsername });
  }
}
