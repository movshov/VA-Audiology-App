import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { ServerAuthenticationService } from '../services/server-authentication.service';

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
  public loginFail: boolean = false;

  constructor(
    public diaglogRef: MatDialogRef<ReloginPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ReloginData,
    private serverAuthenticationService: ServerAuthenticationService,
    private router: Router
    ) { }

  ngOnInit() {
  }

  public onLogout(): void {
    this.router.navigateByUrl('/home');
  }

  public onLogin(): void {
    this.serverAuthenticationService.login(this.data.username, this.data.password).subscribe(
      (response) => {
        this.diaglogRef.close('success');
      },
      (error) => {
        this.loginFail = true;
      }
    )
  }

}
