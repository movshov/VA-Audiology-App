import { Component, OnInit } from '@angular/core';
import { Utilities } from '../common/utlilities';
import { ThsDataService } from '../services/ths-data.service';
import { TsScreenerDataService } from '../services/ts-screener-data.service';
import { TfiDataService } from '../services/tfi-data.service';
import { TsScreenerAnswerStrings, ThsAnswerStrings } from '../common/custom-resource-strings';

@Component({
  selector: 'audiologist-summary',
  templateUrl: './audiologist-summary.component.html',
  styleUrls: ['./audiologist-summary.component.css']
})
export class AudiologistSummaryComponent implements OnInit {
  public patientID;
  public ts;
  public thsA;
  public thsB;
  public thsC;
  public thsCtxt;
  public thsCex;
  public tfi;

  /**
   *
   * @param thsDataService the data service for ths questionare
   * @param tsDataService the data service for ts questionare
   * @param tfiDataService the date service for tfi questionare
   */
  constructor(public thsDataService: ThsDataService, public tsDataService: TsScreenerDataService, public tfiDataService: TfiDataService) {
    this.tsDataService.onInit();
    this.setTS();
    this.thsDataService.onInit();
    this.setTHS();
    this.tfiDataService.onInit();
    this.setTFI();
    this.patientID = Utilities.getSessionStorage('patient-id');
  }

  ngOnInit() {
  }

  public setTS(){
    let answers = this.tsDataService.dataRecord;
    let tsAnswers = new TsScreenerAnswerStrings();
    let index = 0;
    if(answers[index++].choice === tsAnswers.NO) {
      this.ts = "No Tinnitus";
      return;
    }

    this.ts = (answers[index++].choice === tsAnswers.NO) ? "Acute" : "Chronic";
    if(answers[index++].choice !== tsAnswers.SOMETIMES_OCCASIONALLY) {
      this.ts += " Constant Tinnitus";
      return;
    }
    if(answers[index++].choice === tsAnswers.YES_ALWAYS) {
      this.ts += " Temporary Tinnitus";
      return;
    }
    if(answers[3].choice === tsAnswers.YES_SOMETIMES){
      if(answers[index++].choice === tsAnswers.NO) {
        this.ts += " Temporary Tinnitus";
        return;
      }
    }
    this.ts += (answers[index].choice === tsAnswers.DAILY_OR_WEEKLY_BASIS) ? " Intermittent Tinnitus" : " Occasional Tinnitus";
  }

  public setTHS(){
    let answers = this.thsDataService.dataRecord;
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
    for(let i = start; i < length; i++) {
      sum += this.getTHSvalue(array, i);
    }
    return sum;
  }
  private getTHSvalue(array, i): number {
    let thsAnswers = new ThsAnswerStrings();
    console.log(i + ": " + array[i].choice);
    switch(array[i].choice) {
      case thsAnswers.NO: return 0;
      case thsAnswers.SMALL_YES: return 1;
      case thsAnswers.MODERATE_YES: return 2;
      case thsAnswers.BIG_YES: return 3;
      case thsAnswers.VERY_BIG_YES: return 4;
      default: return 0;
    }
  }

  public setTFI(){}

}
