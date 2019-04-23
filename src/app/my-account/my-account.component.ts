import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {
  public messages: Object = {warning: false, display: false, message: ''};
  public passColors: Object = {oldPass: 0, newPass: 0, verifyPass: 0};
  public passFields: Object = {oldPassField: '', newPassField: '', verifyPassField: ''};

  //TODO: !!!!! REMOVE THIS WHEN CONNECTS TO DB!!!!!//
  private pword: string = 'Passw0rd!';
  /////////////////////////////////////////////

  constructor() { }

  public ngOnInit() {
  }

  public oldPassChange() {
    if(this.oldPassIsValid()) {this.passColors['oldPass'] = 1;}
    else if(this.passFields['oldPassField'] === '') {this.passColors['oldPass'] = 0;}
    else {this.passColors['oldPass'] = -1;}
  }
  public newPassChange() {
    this.passColors['newPass'] = this.passwordStrength();
    this.verifyPassChange();
  }
  public verifyPassChange() {
    if(this.passFields['verifyPassField'] === '' && this.passFields['newPassField'] === '') {this.passColors['verifyPass'] = 0;}
    else if(this.passFields['verifyPassField'] === this.passFields['newPassField']) {this.passColors['verifyPass'] = 1;}
    else {this.passColors['verifyPass'] = -1;}
  }
  public onSubmit() {
    this.messages['display'] = false;
    if(!this.oldPassIsValid()) {
      this.messages['message'] = 'Old Password Is Invalid!';
      this.messages['warning'] = true;
    } else if(this.passFields['verifyPassField'] !== this.passFields['newPassField']) {
      this.messages['message'] = 'New Passwords Do Not Match!';
      this.messages['warning'] = true;
    } else if(this.passFields['newPassField'] === '') {
      this.messages['message'] = 'You Must Enter A New Password!';
      this.messages['warning'] = true;
    } else if(this.passColors['newPass'] < 1) {
      this.messages['message'] = 'Choose A Stronger Password!';
      this.messages['warning'] = true;
    } else if(this.passFields['oldPassField'] === this.passFields['newPassField']) {
      this.messages['message'] = 'Choose A New Password!';
      this.messages['warning'] = true;
    } else {
      // TODO: change this to talk to db
      this.pword = this.passFields['newPassField'];
      this.messages['message'] = 'Password Changed';
      this.messages['warning'] = false;
    }
    this.messages['display'] = true;
    console.log(this.pword);
  }

  // TODO: CHANGE this to check with actual password
  private oldPassIsValid(): boolean {
    return this.passFields['oldPassField'] === this.pword;
  }
  private passwordStrength(): number {
    if(this.passFields['newPassField'] === '') { return 0;}
    let total = 0;
    total += this.passFields['newPassField'].toUpperCase() !== this.passFields['newPassField'] ? 1 : 0; // has lower
    total += this.passFields['newPassField'].toLowerCase() !== this.passFields['newPassField'] ? 1 : 0; // has upper
    total += /(!|@|#|\$|%|\^|\&|\*|\(|\)|-|\+)/.test(this.passFields['newPassField']) ? 1 : 0; // has special
    total += /\d/.test(this.passFields['newPassField']) ? 1 : 0; // has digit
    total += this.passFields['newPassField'].length >= 8 ? 1 : 0; // length at least 8

    if(total < 3) { return -1;}
    if(total < 5) { return 1;}
    return 2;
  }

}
