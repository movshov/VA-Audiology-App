import { Router } from '@angular/router';
import { ViewChild, Component, ViewEncapsulation } from '@angular/core';
import { AudiologistSummaryComponent, tfiNames } from '../audiologist-summary/audiologist-summary.component';
import { Utilities } from '../common/utlilities';
import { State, StatesEnum, TabsEnum } from './navigation-aids';

@Component({
  selector: 'audio-navigation',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./audiologist-navigation.component.css'],
  templateUrl: './audiologist-navigation.component.html',
})
/**
 * This function controls the navigation sidebar.
 * Either to show the sidebar or to hide the sidebar.
 * active: boolean is a local variable will be switch between true and false to trigger the function.
 */
export class AudiologistNavigationComponent {
  @ViewChild(AudiologistSummaryComponent) summaryComponent: AudiologistSummaryComponent;
  get TabsEnum() { return TabsEnum; }

  public patientID: string = Utilities.getSessionStorage('patient-id');
  public active: boolean = true;
  public scale: number = 0.55;
  public state: State = new State();

  constructor(private router: Router) {
  }

  public onToggle() {
    if (!this.active) {
      this.active = true;
      console.log('is active');
    } else {
      this.active = false;
      console.log('is active');
    }
  }

  public submitSurvey() {
    if (this.summaryComponent != null) {
      this.summaryComponent.submitSurvey();
    }
  }

  public clearData() {
    // clear all patient data in memory
    Utilities.removeItemFromSessionStorage('patient-id');
    Utilities.removeItemFromSessionStorage('tests-data');
    Utilities.removeItemFromSessionStorage('tfi-dataRecord');
    Utilities.removeItemFromSessionStorage('ths-dataRecord');
    Utilities.removeItemFromSessionStorage('ths-history');
    Utilities.removeItemFromSessionStorage('ts-dataRecord');
    Utilities.removeItemFromSessionStorage('ts-history');
    Utilities.removeItemFromSessionStorage('dataFromDB');
    this.state.determineState();
  }

  public logout() {
    this.clearData();
    Utilities.removeItemFromSessionStorage('audiologist-pin');
    Utilities.removeItemFromSessionStorage('permissions');
    this.router.navigateByUrl('/home');
  }

  // CHANGE this to take an appointment object
  public onApptLoad(appt: Object) {
    this.patientID = appt['id'];
    this.summaryComponent.patientID = appt['id'];
    this.summaryComponent.ts = appt['ts'];
    // this.summaryComponent.tfiVars.set(tfiNames[0], appt[tfiNames[0]]);
    // for(let i = 1; i < tfiNames.length; i++) {
    //   this.summaryComponent.tfiVars.set(tfiNames[i], appt[tfiNames[i]]);
    // }
    this.state.determineState();
  }
}
