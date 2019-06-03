import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface DialogData {
  username: string;
  resetPassword: string;
}

@Component({
  selector: 'admin-password-reset-display',
  templateUrl: './admin-password-reset-display.html',
  styleUrls: ['./admin-password-reset-display.css']
})
export class AdminPasswordDisplay implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AdminPasswordDisplay>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}


  ngOnInit() {
  }

  private onCancel(): void {
    this.dialogRef.close(undefined);
  }
}
