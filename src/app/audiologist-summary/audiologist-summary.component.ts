import { Component, OnInit } from '@angular/core';
import { Utilities } from '../common/utlilities';
import { ThsDataService } from '../services/ths-data.service';
import { TsScreenerDataService } from '../services/ts-screener-data.service';
import { TfiDataService } from '../services/tfi-data.service';
import { TsScreenerAnswerStrings, ThsAnswerStrings } from '../common/custom-resource-strings';
import { TestsDataService } from '../services/tests-data.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'audiologist-summary',
  templateUrl: './audiologist-summary.component.html',
  styleUrls: ['./audiologist-summary.component.css']
})
export class AudiologistSummaryComponent implements OnInit {
  public patientID;
  public ts: string;
  public thsA: number; public thsB: number;
  public thsC: number; public thsCtxt: string; public thsCex: string;
  public overallTFI: number; public intrusive: number; public sense: number; public cognitive: number;
  public sleep: number; public auditory: number; public relaxation: number; public quality: number; public emotional: number;

  public audtype: string; public leftHighSeverity: string; public leftHighConfig: string; public leftLowSeverity: string;
  public leftLowConfig: string; public rightHighSeverity: string; public rightHighConfig: string;
  public rightLowSeverity: string; public rightLowConfig: string; public ototype: string; public tymptype: string;

  private subscription: Subscription;

  /**
   *
   * @param thsDataService the data service for ths questionare
   * @param tsDataService the data service for ts questionare
   * @param tfiDataService the date service for tfi questionare
   */
  constructor(public thsDataService: ThsDataService, public tsDataService: TsScreenerDataService, public tfiDataService: TfiDataService,
    public testsDataService: TestsDataService) {
    this.tsDataService.onInit();
    this.setTS();
    this.thsDataService.onInit();
    this.setTHS();
    this.tfiDataService.onInit();
    this.setTFI();
    this.testsDataService.onInit();
    this.updateTestResults(this.testsDataService.data);
    this.patientID = Utilities.getSessionStorage('patient-id');
  }

  ngOnInit() {
    this.subscription = this.testsDataService.observableData.subscribe(data => this.updateTestResults(data));
  }

  public setTS() {
    let answers = this.tsDataService.dataRecord;
    let tsAnswers = new TsScreenerAnswerStrings();
    let index = 0;
    if (answers.length < 1) {
      return;
    }
    if (answers[index++].choice === tsAnswers.NO) {
      this.ts = "No Tinnitus";
      return;
    }

    this.ts = (answers[index++].choice === tsAnswers.NO) ? "Acute" : "Chronic";
    if (answers[index++].choice !== tsAnswers.SOMETIMES_OCCASIONALLY) {
      this.ts += " Constant Tinnitus";
      return;
    }
    if (answers[index++].choice === tsAnswers.YES_ALWAYS) {
      this.ts += " Temporary Tinnitus";
      return;
    }
    if (answers[3].choice === tsAnswers.YES_SOMETIMES) {
      if (answers[index++].choice === tsAnswers.NO) {
        this.ts += " Temporary Tinnitus";
        return;
      }
    }
    this.ts += (answers[index].choice === tsAnswers.DAILY_OR_WEEKLY_BASIS) ? " Intermittent Tinnitus" : " Occasional Tinnitus";
  }

  public setTHS() {
    let answers = this.thsDataService.dataRecord;
    if (answers.length < 1) {
      return;
    }
    this.thsA = this.sumTHS(answers, 0, 4);
    this.thsB = this.sumTHS(answers, 4, 4);
    this.thsC = this.getTHSvalue(answers, 8);
    this.thsCtxt = answers[8].choice;
    this.thsCex = this.thsC > 0 ? answers[9].choice : "";
    console.log(answers);
  }
  private sumTHS(array, start, length): number {
    let sum: number = 0;
    length += start;
    for (let i = start; i < length; i++) {
      sum += this.getTHSvalue(array, i);
    }
    return sum;
  }
  private getTHSvalue(array, i): number {
    let thsAnswers = new ThsAnswerStrings();
    if (array.length < 1) {
      return;
    }
    switch (array[i].choice) {
      case thsAnswers.NO: return 0;
      case thsAnswers.SMALL_YES: return 1;
      case thsAnswers.MODERATE_YES: return 2;
      case thsAnswers.BIG_YES: return 3;
      case thsAnswers.VERY_BIG_YES: return 4;
      default: return 0;
    }
  }

  public setTFI() {
    let answers = this.tfiDataService.dataRecord;
    // Calculate overall TFI score
    this.overallTFI = 0;
    for (let i = 0; i < answers.length; i++) {
      this.overallTFI += answers[i].choice;
    }
    this.overallTFI /= 25;
    this.overallTFI *= 10;

    // Calculate subscores
    this.intrusive = this.calcTFIsub(answers, 0, 3);
    this.sense = this.calcTFIsub(answers, 3, 3);
    this.cognitive = this.calcTFIsub(answers, 6, 3);
    this.sleep = this.calcTFIsub(answers, 9, 3);
    this.auditory = this.calcTFIsub(answers, 12, 3);
    this.relaxation = this.calcTFIsub(answers, 15, 3);
    this.quality = this.calcTFIsub(answers, 18, 4);
    this.emotional = this.calcTFIsub(answers, 22, 3);
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
    this.updateAudiogramResults(data);
    if(data.length < 1) {
      return;
    }
    // get otoscopy type
    let index: number = data.findIndex((x) => x.name === 'otoscopyType');
    if(index !== -1) {
      this.ototype = data[index].value;
    }
    // get tympanometry type
    index = data.findIndex((x) => x.name === 'tympanometryType');
    if(index !== -1) {
      this.tymptype = data[index].value;
    }
  }
  private updateAudiogramResults(answers: Array<{ name: string, value: string }>) {
    if (answers.length < 1) {
      return;
    }
    // get audiogram type
    let index: number = answers.findIndex((x) => x.name === 'audiogramType');
    if (index !== -1) {
      this.audtype = answers[index].value;
    }
    // get Left Ear High Frequency Severity
    index = answers.findIndex((x) => x.name === 'leftHighSev');
    if (index !== -1) {
      this.leftHighSeverity = answers[index].value;
    }
    // get Left Ear Low Frequency Severity
    index = answers.findIndex((x) => x.name === 'leftLowSev');
    if (index !== -1) {
      this.leftLowSeverity = answers[index].value;
    }
    // get Right Ear High Frequency Severity
    index = answers.findIndex((x) => x.name === 'rightHighSev');
    if (index !== -1) {
      this.rightHighSeverity = answers[index].value;
    }
    // get Right Ear Low Frequency Severity
    index = answers.findIndex((x) => x.name === 'rightLowSev');
    if (index !== -1) {
      this.rightLowSeverity = answers[index].value;
    }
    // get Left Ear High Frequency Configuration
    this.leftHighConfig = this.createConfigList('leftHighConfig', answers);
    // get Left Ear Low Frequency Configuration
    this.leftLowConfig = this.createConfigList('leftLowConfig', answers);
    // get Right Ear High Frequency Configuration
    this.rightHighConfig = this.createConfigList('rightHighConfig', answers);
    // get Right Ear Low Frequency Configuration
    this.rightLowConfig = this.createConfigList('rightLowConfig', answers);
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
    let list: string = "";
    for(let config in configurations) {
      let index = data.findIndex((x) => x.name === (prefix + configurations[config]));
      if(index !== -1) {
        if(data[index].value) {
          list += configurations[config] + ", ";
        }
      }
    }
    console.log("list: " + list);
    list = list.slice(0, -2);
    return list;
  }

}
