import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsersObject } from '../../../api-objects/UsersObject';
import { ServerApiService } from './server-api.service';
import { Response } from '../../../api-objects/GenericResponse';

@Injectable()
export class ApiUsersCrudService {

  constructor(private serverApiService: ServerApiService) { }

  // Response data should be the generated password.
  public createUser(usersObj: UsersObject): Observable<Response<string>> {
    return this.serverApiService.post<string>('createUser', usersObj);
  }

  // Response data should be an array of UsersObject
  public getUsers(): Observable<Response<UsersObject[]>> {
    return this.serverApiService.get<UsersObject[]>('accounts');
  }

  // Response data should be true if password changed
  public changePassword(oldPassword: string, newPassword: string): Observable<Response<boolean>> {
    return this.serverApiService.post<boolean>('changePassword', {oldPassword, newPassword});
  }

  // Response data should be the new generated password
  public resetPassword(username: string): Observable<Response<string>> {
    return this.serverApiService.post<string>('accounts/resetPassword', {username});
  }

  // Response data should be true if user was deleted
  public deleteUser(username: string): Observable<Response<boolean>> {
    return this.serverApiService.delete<boolean>('accounts/'+username);
  }

  // Response data should be true if user was deleted
  public updateUsername(username: string, newUsername: string): Observable<Response<null>> {
    return this.serverApiService.post<null>('accounts/changeUsername', {username, 'newusername': newUsername});
  }
}
