import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface ReloginData {
  password: string;
}

@Component({
  selector: 'admin-password-confirm',
  templateUrl: './admin-password-confirm.html',
  styleUrls: ['./admin-password-confirm.css']
})
export class AdminPasswordConfirm implements OnInit {

  public data: ReloginData = {password: ''};
  
  constructor(
    private diaglogRef: MatDialogRef<AdminPasswordConfirm>,
    ) {}

  ngOnInit() {
  }

  private onSubmit(): void {
    this.diaglogRef.close(this.data.password);
  }
  private onCancel(): void {
    this.diaglogRef.close(undefined);
  }
}
