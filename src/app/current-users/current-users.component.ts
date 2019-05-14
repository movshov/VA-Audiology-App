import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Users } from './users';
import { UsersObject } from '../../../api-objects/UsersObject';
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

  constructor(private apiUsersCrudService: ApiUsersCrudService, private notificationService: NotificationService) { }

  public ngOnInit() {
    this.getAllUsers();
  }

  public getAllUsers(): void {
    this.apiUsersCrudService.getUsers()
      .subscribe(
        (results) => {
          this.usersTable = results.data;
          console.log(this.usersTable);
          console.log('Users loading...');

        });

    // this.usersTable = Users;
    // this.usersTable.map((types) => {
    //   if(types.authorityType === 0) {} else {}
    // });
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
  // public deleteUser(user: UsersObject) {
  //   this.apiUsersCrudService.deleteUser(user.username).subscribe(
  //     result => {
  //       let index: number = this.usersTable.indexOf(user);
  //       this.usersTable.splice(index, 1);
  //       this.notificationService.showSuccess('SUCCESS! User '+ user.username + ' has been successfully deleted MESSAGE:::' + JSON.stringify(result));
  //     });
  // }

  public resetPassword(user: UsersObject) {
    this.apiUsersCrudService.resetPassword(user.username).subscribe(
      result => {
        this.notificationService.showSuccess('NEW PASSWORD FOR ' + user.username + ' IS: ' + result.data);;
      }
    )
  }

  /**
   * Updates the username of the user, at a given index.
   * @param f NgForm that contains the value inside the form tag in the template view
   * @param update UsersObject that keeps track of the index.
   */
  public updateUser(f: NgForm, update: UsersObject) {
    this.apiUsersCrudService.updateUsername(update.username, f.value.username).subscribe(
      result => {
        this.notificationService.showSuccess('SUCCESS! User ' + update.username + ' has been successfully updated to ' + f.value.username + ' MESSAGE ' + JSON.stringify(result.data));
        let index: number = this.usersTable.indexOf(update);
        if (f.value.username !== '') {
          this.usersTable[index].username = f.value.username;
        }
      });
  }

}
