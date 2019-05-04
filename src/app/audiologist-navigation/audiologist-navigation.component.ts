import { Router } from '@angular/router';
import { ViewChild, Component, ViewEncapsulation } from '@angular/core';
import { AudiologistSummaryComponent } from '../audiologist-summary/audiologist-summary.component';
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
  public state: State = new State(StatesEnum.FROM_QUEST, TabsEnum.SUMMARY);

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
  }

  public logout() {
    this.clearData();
    this.router.navigateByUrl('');
  }
}
