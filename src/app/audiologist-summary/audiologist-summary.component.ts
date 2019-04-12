import { Component, OnInit } from '@angular/core';
import { Utilities } from '../common/utlilities';
import { ThsDataService } from '../services/ths-data.service';
import { TsScreenerDataService } from '../services/ts-screener-data.service';
import { TfiDataService } from '../services/tfi-data.service';
import { TsScreenerAnswerStrings, ThsAnswerStrings } from '../common/custom-resource-strings';
import { TestsDataService } from '../services/tests-data.service';
import { Subscription } from 'rxjs/Subscription';

const tfiNames: string[] = ['overallTFI', 'intrusive', 'sense', 'cognitive', 'sleep', 'auditory', 'relaxation', 'quality', 'emotional'];
const testRadioNames: string[] = ['audiogramType', 'leftHighSev', 'leftLowSev', 'rightHighSev', 'rightLowSev', 'otoscopyType', 'tympanometryType'];
const testCheckBoxNames: string[] = ['leftHighConfig', 'leftLowConfig', 'rightHighConfig', 'rightLowConfig'];

@Component({
  selector: 'audiologist-summary',
  templateUrl: './audiologist-summary.component.html',
  styleUrls: ['./audiologist-summary.component.css']
})
export class AudiologistSummaryComponent implements OnInit {
  public patientID: string = Utilities.getSessionStorage('patient-id');
  public ts: string = '';

  public tfiVars: Map<string, number> = new Map();
  public testRadioVars: Map<string, string> = new Map();
  public testCheckBoxVars: Map<string, string> = new Map();

  public htmlVars: Map<string, any> = new Map();

  private subscription: Subscription;

  /**
   *
   * @param thsDataService the data service for ths questionare
   * @param tsDataService the data service for ts questionare
   * @param tfiDataService the data service for tfi questionare
   * @param testsDataService the data service for the test results
   */
  constructor(public thsDataService: ThsDataService, public tsDataService: TsScreenerDataService, public tfiDataService: TfiDataService,
    public testsDataService: TestsDataService) {
    this.createHTMLvars();
    this.tsDataService.onInit();
    this.setTS();
    this.thsDataService.onInit();
    this.setTHS();
    this.tfiDataService.onInit();
    this.setTFI();
    this.testsDataService.onInit();
    this.updateTestResults(this.testsDataService.data);
  }

  public ngOnInit() {
    this.subscription = this.testsDataService.observableData.subscribe(data => this.updateTestResults(data));
  }

  //////////////
  // PRIVATES //
  //////////////
  private setTS() {
    let answers = this.tsDataService.dataRecord;
    let tsAnswers = new TsScreenerAnswerStrings();
    let index = 0;
    if (answers.length < 1) {
      return;
    }
    if (answers[index].choice === tsAnswers.NO) {
      this.ts = 'No Tinnitus';
      return;
    }
    index++;

    this.ts = (answers[index].choice === tsAnswers.NO) ? 'Acute' : 'Chronic';
    index++;
    if (answers[index].choice !== tsAnswers.SOMETIMES_OCCASIONALLY) {
      this.ts += ' Constant Tinnitus';
      return;
    }
    index++;
    if (answers[index].choice === tsAnswers.YES_ALWAYS) {
      this.ts += ' Temporary Tinnitus';
      return;
    }
    index++;
    // The answer to question 4 may stop, lead to question 5, or lead to question 6.
    if (answers[3].choice === tsAnswers.YES_SOMETIMES) {
      if (answers[index].choice === tsAnswers.NO) {
        this.ts += ' Temporary Tinnitus';
        return;
      }
      index++;
    }
    this.ts += (answers[index].choice === tsAnswers.DAILY_OR_WEEKLY_BASIS) ? ' Intermittent Tinnitus' : ' Occasional Tinnitus';
  }

  private setTHS() {
    let answers = this.thsDataService.dataRecord;
    if (answers.length < 1) {
      return;
    }
    this.htmlVars.set('thsA', this.sumTHS(answers, 0, 4));
    this.htmlVars.set('thsB', this.sumTHS(answers, 4, 4));
    let tmp = this.getTHSvalue(answers[8]);
    this.htmlVars.set('thsC', tmp);
    this.htmlVars.set('thsCtxt', answers[8].choice);
    tmp = tmp > 0 ? answers[9].choice : '';
    this.htmlVars.set('thsCex', tmp);
  }

  private setTFI() {
    let answers = this.tfiDataService.dataRecord;
    // Calculate overall TFI score
    let overall = 0;
    for (let i = 0; i < answers.length; i++) {
      overall += answers[i].choice;
    }
    overall /= 25;
    overall *= 10;
    this.tfiVars.set('overallTFI', overall);

    // Calculate subscores
    this.tfiVars.set('intrusive', this.calcTFIsub(answers, 0, 3));
    this.tfiVars.set('sense', this.calcTFIsub(answers, 3, 3));
    this.tfiVars.set('cognitive', this.calcTFIsub(answers, 6, 3));
    this.tfiVars.set('sleep', this.calcTFIsub(answers, 9, 3));
    this.tfiVars.set('auditory', this.calcTFIsub(answers, 12, 3));
    this.tfiVars.set('relaxation', this.calcTFIsub(answers, 15, 3));
    this.tfiVars.set('quality', this.calcTFIsub(answers, 18, 4));
    this.tfiVars.set('emotional', this.calcTFIsub(answers, 22, 3));
  }

  private sumTHS(array: { state: any; choice: any; }[], start: number, length: number): number {
    let sum: number = 0;
    let end = start + length;
    for (let i = start; i < end; i++) {
      sum += this.getTHSvalue(array[i]);
    }
    return sum;
  }
  private getTHSvalue(element: { state: number; choice: string; }): number {
    let thsAnswers = new ThsAnswerStrings();
    let ans: Array<string> = [
      thsAnswers.NO, thsAnswers.SMALL_YES, thsAnswers.MODERATE_YES, thsAnswers.BIG_YES, thsAnswers.VERY_BIG_YES
    ];
    return ans.indexOf(element.choice);
  }
  private calcTFIsub(array: { state: number; choice: number; }[], start: number, length: number): number {
    let score: number = 0;
    if (array.length < 1) {
      return;
    }
    for (let i = start; i < start + length; i++) {
      score += array[i].choice
    }
    score /= length;
    score *= 10;
    return score;
  }

  private updateTestResults(data: Array<{ name: string, value: string }>) {
    if (data.length < 1) {
      return;
    }
    for (let dat in data) {
      if (data.hasOwnProperty(dat)) {
        if(testRadioNames.includes(data[dat].name)) {
          this.testRadioVars.set(data[dat].name, data[dat].value);
        }
      }
    }

    for(let box in testCheckBoxNames) {
      if(testCheckBoxNames.hasOwnProperty(box)) {
        this.testCheckBoxVars.set(testCheckBoxNames[box], this.createConfigList(testCheckBoxNames[box], data));
      }
    }
  }

  private createConfigList(prefix: string, data: Array<{ name: string, value: string }>): string {
    let configurations = [
      'Symmetric',
      'Asymmetric',
      'Progressive',
      'Sudden',
      'Flat',
      'Rising',
      'Cookie Bite',
      'Precipitous',
      'Noise-Notch',
      'Corner'
    ];
    let list: string = '';
    configurations.forEach(config => {
      if (data.some(x => (x.name === (prefix + config)) && (x.value === 'true'))) {
        list += config + ', ';
      }
    });
    list = list.slice(0, -2);
    return list;
  }

  private createHTMLvars() {
    this.htmlVars.set('thsA', 0);
    this.htmlVars.set('thsB', 0);
    this.htmlVars.set('thsC', 0);
    this.htmlVars.set('thsCtxt', '');
    this.htmlVars.set('thsCex', '');


  }

}
