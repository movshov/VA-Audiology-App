import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Utilities } from '../common/utlilities';
import { TsScreenerDataService } from '../services/ts-screener-data.service';
import { ThsDataService } from '../services/ths-data.service';
import { TfiDataService } from '../services/tfi-data.service';

@Component ({
  selector: 'appointments',
  styleUrls: ['./appointments.component.css'],
  templateUrl: './appointments.component.html'
})

export class AppointmentsComponent {

  constructor(private router: Router, private tsDataService: TsScreenerDataService, private  thsDataService: ThsDataService, private  tfiDataService: TfiDataService) {
  };

  /**
   * This function will be triggered when the "Initial Assessment" button is clicked
   * then it will route to the ts-screener page to start testing.
   * It creates a console log to inform the developer which button was being pressed.
   */
  public onInitialAssessment() {
    console.log('Initial Assessment');
    this.clearData();
    Utilities.setSessionStorage('appt', 'Initial Assessment');
    this.router.navigateByUrl('/ts');
  }
  /**
   * This function will be triggered when the "Hearing Aids Fitting" button is clicked
   * then it will route to the ts-screener page to start testing.
   * It creates a console log to inform the developer which button was being pressed.
   */
  public onHearingAidsFitting() {
    console.log('Hearing Aids Fitting');
    this.clearData();
    Utilities.setSessionStorage('appt', 'Hearing Aids Fitting');
    this.router.navigateByUrl('/ts');
  }
  /**
   * This function will be triggered when the "Hearing Aids Evaluation" button is clicked
   * then it will route to the ts-screener page to start testing.
   * It creates a console log to inform the developer which button was being pressed.
   */
  public onHearingAidsEvaluation() {
    console.log('Hearing Aids Evaluation');
    this.clearData();
    Utilities.setSessionStorage('appt', 'Hearing Aids Evaluation');
    this.router.navigateByUrl('/ts');
  }

  private clearData(): void {
    // clear all patient data in memory
    let sessionKeys: string[] = [
      'patient-id',
      'tests-data',
      'tfi-dataRecord',
      'ths-dataRecord',
      'ths-history',
      'ts-dataRecord',
      'ts-history',
      'appt'
    ];
    sessionKeys.forEach((value) => {
      Utilities.removeItemFromSessionStorage(value);
    });
    this.tsDataService.clearHistory();
    this.thsDataService.clearHistory();
    this.tfiDataService.clearHistory();
  }
}
