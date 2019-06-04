import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { ReloginPopupService } from './relogin-popup.service';
import ClearData from '../common/clear-data';

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
  private data: ReloginData = { username: '', password: '' };

  constructor(
    private diaglogRef: MatDialogRef<ReloginPopupComponent>,
    private router: Router,
    private service: ReloginPopupService,
    private clearMemory: ClearData
  ) { }

  public ngOnInit() {
  }

  private onLogout(): void {
    // clear all patient data in memory
    this.clearMemory.clearData();
    this.router.navigateByUrl('/home');
    this.diaglogRef.close();
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
