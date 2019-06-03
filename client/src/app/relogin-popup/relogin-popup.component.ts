import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { Utilities } from '../common/utlilities';
import { ReloginPopupService } from './relogin-popup.service';
import GenericClearMemory from '../common/generic-clear-memory';

export interface ReloginData {
  username: string;
  password: string;
}

@Component({
  selector: 'app-relogin-popup',
  templateUrl: './relogin-popup.component.html',
  styleUrls: ['./relogin-popup.component.css']
})
export class ReloginPopupComponent implements OnInit {
  private loginFail: boolean = false;
  private data: ReloginData = {username: '', password: ''};

  constructor(
    private diaglogRef: MatDialogRef<ReloginPopupComponent>,
    private router: Router,
    private service: ReloginPopupService, 
    private clearMemory: GenericClearMemory
    ) { }

  public ngOnInit() {
  }

  private onLogout(): void {
    // clear all patient data in memory
    this.clearMemory.clearMemory(false, () => {
      this.router.navigateByUrl('/home');
      this.diaglogRef.close();
    });
  }

  private onLogin(): void {
    this.service.login(this.data.username, this.data.password).subscribe((response) => {
      this.loginFail = false;
      this.diaglogRef.close();
    },
      (error) => {
        this.loginFail = true;
        this.data.password = '';
        this.data.username = '';
      });
  }

}
