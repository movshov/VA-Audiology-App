import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsersObject, authorityTypes } from '../../../api-objects/UsersObject';
import { ApiUsersCrudService } from '../services/api-users-crud.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'current-users',
  templateUrl: './current-users.component.html',
  styleUrls: ['./current-users.component.css']
})

export class CurrentUsersComponent implements OnInit {
  public usersTable: UsersObject[] = [];
  public pageCounter: number = 0;
  public authorityTypes = authorityTypes;

  constructor(private apiUsersCrudService: ApiUsersCrudService, private notificationService: NotificationService) { }

  public ngOnInit() {
    this.getAllUsers();
  }

  public getAllUsers(): void {
    this.apiUsersCrudService.getUsers()
      .subscribe(
        (results) => {
          this.usersTable = results.data;
        });
  }

  public prevPage(pageNum: number): void {
    while (this.pageCounter > 0 && pageNum > 0) {
      this.pageCounter -= 1;
      pageNum -= 1;
    }
  }

  public nextPage(pageNum: number): void {
    while ((this.pageCounter + 1) * 10 < this.usersTable.length && pageNum > 0) {
      this.pageCounter += 1;
      pageNum += 1;
    }
  }

  /**
   * Deletes a user at a given index.
   * @param user a user object to be deleted
   */
  public deleteUser(user: UsersObject) {
    this.apiUsersCrudService.deleteUser(user.username).subscribe(
      (_) => {
        let index: number = this.usersTable.indexOf(user);
        this.usersTable.splice(index, 1);
        this.notificationService.showSuccess('User '+ user.username + ' was successfully deleted');
      }
    )
  }

  /**
   * Updates the username of the user, at a given index.
   * @param f NgForm that contains the value inside the form tag in the template view
   * @param update UsersObject that keeps track of the index.
   */
  public updateUser(f: NgForm, update: UsersObject) {
    let index: number = this.usersTable.indexOf(update);
    if (f.value.username !== '') {
      this.apiUsersCrudService.updateUsername(update.username, f.value.username).subscribe(
        (_) => {
          this.notificationService.showSuccess('Username, ' + update.username + ' was successfully updated to ' + f.value.username);
          this.usersTable[index].username = f.value.username;
        }
      )
    }
  }

  public resetPassword(user: UsersObject) {
    this.apiUsersCrudService.resetPassword(user.username).subscribe(
      result => {
        this.notificationService.showSuccess('NEW PASSWORD FOR ' + user.username + ' IS: ' + result.data);
      }
    )
  }

}