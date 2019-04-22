import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {
  public oldPass: number = 0;
  public newPass: number = 0;
  public verifyPass: number = 0;
  public newPassField: string = '';
  public verifyPassField: string = '';

  constructor() { }

  public ngOnInit() {
  }

  public oldPassChange(event: string) {
    if(this.oldPassIsValid(event)) {this.oldPass = 1;}
    else if(event === '') {this.oldPass = 0;}
    else {this.oldPass = -1;}
  }
  public newPassChange(event: string) {
    this.newPass = this.passwordStrength(event);
    this.verifyPassChange(this.verifyPassField);
  }
  public verifyPassChange(event: string) {
    if(event === this.newPassField) {this.verifyPass = 1;}
    else if(event === '') {this.verifyPass = 0;}
    else {this.verifyPass = -1;}
  }

  // CHANGE this to check with actual password
  private oldPassIsValid(password: string): boolean {
    return password === 'password';
  }
  private passwordStrength(password: string): number {
    if(password === '') { return 0;}
    let total = 0;
    total += password.toUpperCase() !== password ? 1 : 0; // has lower
    total += password.toLowerCase() !== password ? 1 : 0; // has upper
    total += /(!|@|#|\$|%|\^|\&|\*|\(|\)|-|\+)/.test(password) ? 1 : 0; // has special
    total += /\d/.test(password) ? 1 : 0; // has digit
    total += password.length >= 8 ? 1 : 0; // length at least 8

    if(total < 3) { return -1;}
    if(total < 5) { return 1;}
    return 2;
  }

}
