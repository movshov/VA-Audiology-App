import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {
  public oldPass;
  public newPass;
  public verifyPass;

  constructor() { }

  public ngOnInit() {
  }

  public prevPassIsValid(): boolean {
    return true;
  }

  public newPassIsValid(): boolean {
    return false;
  }

  public verifyPassIsValid(): boolean {
    return this.newPass === this.verifyPass;
  }

}
