import { Component, Input, Output, EventEmitter, ViewChild, ContentChild, OnInit } from '@angular/core';
import { ThsAnswerStrings } from '../../common/custom-resource-strings';
import { ThsDataService } from '../../services/ths-data.service';

export enum buttonState {
  NO,
  SMALL_YES,
  MODERATE_YES,
  BIG_YES,
  VERY_BIG_YES
};

@Component({
  selector: 'ths-question',
  styleUrls: ['./ths-question.component.css'],
  template: `
    <nav class="navbar navbar-fixed-top" id="navigation">
      <div class="container-fluid">
        <div class="navbar-header">
          <button (click)="this.router.navigateByUrl('/home')" type="button" class="btn btn-primary btn-sm home-button">
            <span class="glyphicon glyphicon-home"></span> Home
          </button>
        </div>
      </div>
  </nav>
    
    <h2 class="questionHeader">{{question}}</h2>
    <div *ngIf="question !== 'Please list two examples of sounds that are too loud or uncomfortable for you, but seem normal to others:'; else input_questions" class="row">
      <div class="btn2" align="center" col-sm-4 col-sm-offset-4 col-xs-offset-2>
           <table>
             <tr><td><button class="btn1" (click)="answer_rad1()" [ngClass]="{green: buttonChoice === 0, white: buttonChocie !==0}">{{radio1}}</button></td></tr>
             <tr><td><button class="btn1" (click)="answer_rad2()" [ngClass]="{green: buttonChoice === 1, white: buttonChocie !==1}">{{radio2}}</button></td></tr>
             <tr><td><button class="btn1" (click)="answer_rad3()" [ngClass]="{green: buttonChoice === 2, white: buttonChocie !==2}">{{radio3}}</button></td></tr>
             <tr><td><button class="btn1" (click)="answer_rad4()" [ngClass]="{green: buttonChoice === 3, white: buttonChocie !==3}">{{radio4}}</button></td></tr>
             <tr><td><button class="btn1" (click)="answer_rad5()" [ngClass]="{green: buttonChoice === 4, white: buttonChocie !==4}">{{radio5}}</button></td></tr>
           </table>
      </div>
    </div>
    <ng-template #input_questions>
    <div class="col-sm-3"></div>
    <div class="col-sm-6">
      <form class="inputForm">
        <mat-form-field class="fields">
        <textarea autofocus="true" matInput placeholder="Example 1 & 2:" value="{{selectedValue}}" [(ngModel)]="selectedValue" name="textBox"></textarea>
        </mat-form-field><br>
      </form>
      </div>
    <div class="col-sm-3"></div>
    </ng-template>
    <div class="col-sm-6 col-sm-offset-3">
    <p *ngIf="state === 9" class="extra">{{answerStrings.note}}</p>
    <p *ngIf="state === 10" class="extra">{{answerStrings.examples}}</p>
    </div>
    <div class="row">
      <div class="col-sm-6 col-sm-offset-3 sectionWrap" style="padding-top: 2%;">
        <button class="buttons1 btn btn-primary" (click)="onClickedBack.emit(selectedValue)">BACK</button>
        <ng-template #disabled_btn>
          <button class="buttons1 btn" (click)="onClickedBack.emit(selectedValue)" disabled>BACK</button>
        </ng-template>
        <button class="buttons2 btn btn-primary" (click)="onClickedNext.emit(selectedValue)">NEXT</button>
      </div>
    </div>
    `
})

// Represents a single TinnitusScreener Question.  Commonly used component that can adjust with inputs.
export class ThsQuestionComponent implements OnInit {
  public answerStrings: ThsAnswerStrings = new ThsAnswerStrings();

  @Input() public question: string = '';
  @Input() public radio1: string = ThsAnswerStrings.NO;
  @Input() public radio2: string = ThsAnswerStrings.SMALL_YES;
  @Input() public radio3: string = ThsAnswerStrings.MODERATE_YES;
  @Input() public radio4: string = ThsAnswerStrings.BIG_YES;
  @Input() public radio5: string = ThsAnswerStrings.VERY_BIG_YES;
  @Input() public state: number = null;
  public buttonChoice: buttonState;

  @Output() public onClickedBack: EventEmitter<string> = new EventEmitter<string>();
  @Output() public onClickedNext: EventEmitter<string> = new EventEmitter<string>();

  public selectedValue: string;

  constructor(private dataService: ThsDataService) {
    this.dataService.onInit();
  };

  public ngOnInit() {
    this.selectedValue = this.dataService.populateAnswers(this.state);
  }

  public setButton(button:buttonState):void {
    this.buttonChoice = button;
  }

  public answer_rad1():void {
    this.setButton(buttonState.NO);
    this.selectedValue = this.radio1;
  }

  public answer_rad2():void {
    this.setButton(buttonState.SMALL_YES);
    this.selectedValue = this.radio2;
  }

  public answer_rad3():void {
    this.setButton(buttonState.MODERATE_YES);
    this.selectedValue = this.radio3;
  }

  public answer_rad4():void {
    this.setButton(buttonState.BIG_YES);
    this.selectedValue = this.radio4;
  }

  public answer_rad5() {
    this.setButton(buttonState.VERY_BIG_YES);
    this.selectedValue = this.radio5;
  }

}
