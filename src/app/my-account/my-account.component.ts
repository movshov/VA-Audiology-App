import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {
  public colors: { red: number, green: number, yellow: number, blue: number, red2: number, green2: number };
  public messages: { color: number, display: boolean, message: string };
  public passColors: { oldPass: number, newPass: number, verifyPass: number };
  public passFields: { oldPassField: string, newPassField: string, verifyPassField: string };
  public submitDisabled: boolean = false;


  //TODO: !!!!! REMOVE THIS WHEN CONNECTS TO DB!!!!!//
  private pword: string = 'Passw0rd!';
  /////////////////////////////////////////////

  constructor() {
    this.colors = { red: 0, green: 1, yellow: 2, blue: 3, red2: 4, green2: 5 };
    this.messages = { color: this.colors.red, display: false, message: '' };
    this.passColors = { oldPass: this.colors.blue, newPass: this.colors.blue, verifyPass: this.colors.blue };
    this.passFields = { oldPassField: '', newPassField: '', verifyPassField: '' };
   }

  public ngOnInit() {
  }

  public oldPassChange(): void {
    this.passColors.oldPass = this.colors.blue;
  }
  public newPassChange(): void {
    this.passColors.newPass = this.passwordStrength();
    this.verifyPassChange();
  }
  public verifyPassChange(): void {
    if (this.passFields.verifyPassField === '' && this.passFields.newPassField === '') { this.passColors.verifyPass = this.colors.blue; }
    else if (this.passFields.verifyPassField === this.passFields.newPassField) { this.passColors.verifyPass = this.colors.green; }
    else { this.passColors.verifyPass = this.colors.red; }
  }
  public onSubmit(): void {
    this.submitDisabled = true;
    this.messages.display = true;
    let warn: boolean = true;
    if (this.passFields.oldPassField === '') {
      this.passColors.oldPass = this.colors.red;
      this.messages.message = 'You Must Enter Your Old Password/Passphrase!';
    } else if (this.passFields.newPassField === '') {
      this.messages.message = 'You Must Enter A New Password/Passphrase!';
    } else if (this.passColors.newPass === this.colors.red) {
      this.messages.message = 'Choose A Stronger Password/Passphrase!';
    } else if (this.passFields.verifyPassField !== this.passFields.newPassField) {
      this.messages.message = 'New Passwords/Passphrases Do Not Match!';
    } else if (this.passFields.oldPassField === this.passFields.newPassField) {
      this.messages.message = 'Choose A New Password/Passphrase!';
    } else if (!this.oldPassMatches()) {
      this.passColors.oldPass = this.colors.red;
      this.messages.message = 'Old Password/Passphrase Is Invalid!';
    } else {
      // TODO: REMOVE the following line when we connect to DB
      this.pword = this.passFields.newPassField;
      this.messages.message = 'Password/Passphrase Changed';
      warn = false;
      this.passColors.oldPass = this.colors.green;
    }
    this.animWarn(warn);
    this.submitDisabled = false;
    console.log(this.pword);
  }

  // TODO: CHANGE this to check with actual password in DB
  private oldPassMatches(): boolean {
    return this.passFields.oldPassField === this.pword;
  }
  private passwordStrength(): number {
    if (this.passFields.newPassField === '') { return this.colors.blue; }
    let total: number = 0;
    total += this.passFields.newPassField.toUpperCase() !== this.passFields.newPassField ? 1 : 0; // has lower
    total += this.passFields.newPassField.toLowerCase() !== this.passFields.newPassField ? 1 : 0; // has upper
    total += /(!|@|#|\$|%|\^|\&|\*|\(|\)|-|\+)/.test(this.passFields.newPassField) ? 1 : 0; // has special
    total += /\d/.test(this.passFields.newPassField) ? 1 : 0; // has digit
    total += this.passFields.newPassField.length >= 15 ? 7 : this.passFields.newPassField.length >= 8 ? 5 : 0; // length at least 20

    if (total < 8) { return this.colors.red; }
    if (total < 9) { return this.colors.yellow; }
    return this.colors.green;
  }
  private animWarn(warn: boolean): void {
    if (this.messages.color === this.colors.red || this.messages.color === this.colors.red2) {
      if (warn) {
        this.messages.color = this.messages.color === this.colors.red ? this.colors.red2 : this.colors.red;
      } else {
        this.messages.color = this.colors.green;
      }
    } else {
      if (warn) {
        this.messages.color = this.colors.red;
      } else {
        this.messages.color = this.messages.color === this.colors.green ? this.colors.green2 : this.colors.green;
      }
    }
  }

}
