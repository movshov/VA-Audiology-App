import { Router } from '@angular/router';
import { ViewChild, Component, ViewEncapsulation } from '@angular/core';
import { AudiologistSummaryComponent, tfiNames } from '../audiologist-summary/audiologist-summary.component';
import { Utilities } from '../common/utlilities';
import { State, StatesEnum, TabsEnum } from './navigation-aids';
import { Appointment } from 'api-objects/Appointment';
import { ApiUsersCrudService } from '../services/api-users-crud.service';

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
  get TabsEnum() { return TabsEnum; }
  public patientID: string = Utilities.getSessionStorage('patient-id');
  public active: boolean = true;
  public scale: number = 0.55;
  public state: State = new State();
  public users: string = 'Users';
  @ViewChild(AudiologistSummaryComponent) private summaryComponent: AudiologistSummaryComponent;

  constructor(private router: Router, private service: ApiUsersCrudService) {
  }

  public ngOnInit() {
    if(this.summaryComponent.ts === '' || this.summaryComponent.ts === null) {
      this.state.determineState(false);
    } else {
      this.state.determineState(true, false);
    }
  }

  public onToggle() {
    if (!this.active) {
      this.active = true;
      console.log('is active');
    } else {
      this.active = false;
      console.log('is inactive');
    }
  }

  public submitSurvey() {
    if (this.summaryComponent != null) {
      this.summaryComponent.submitSurvey();
    }
  }

  public clearData() {
    // clear all patient data in memory
    let sessionKeys: string[] = [
      'patient-id', 
      'tests-data', 
      'tfi-dataRecord', 
      'ths-dataRecord', 
      'ths-history', 
      'ts-dataRecord', 
      'ts-history'
    ];
    sessionKeys.forEach( (value) => {
      Utilities.removeItemFromSessionStorage(value);
    });
    this.patientID = null;
    this.state.determineState(false);
  }

  public logout() {
    this.clearData();
    Utilities.removeItemFromSessionStorage('audiologist-pin');
    Utilities.removeItemFromSessionStorage('permissions');
    this.router.navigateByUrl('/home');
  }

  public onApptLoad(appt: Appointment) {
    this.patientID = appt.patientid.toString();
    this.summaryComponent.patientID = appt.patientid.toString();
    this.summaryComponent.ts = appt.ts_type;
    // Load the rest of the summary...
    this.state.determineState(true, true);
  }

  public testUsersCRUD() {
    this.service.deleteUser('Addy').subscribe(data => {
      this.users = '';
      this.users += 'username: ' + data.data.username + '  password: ' + data.data.password + '  success: ' + data.data.success + '\n';
      // for(let tmp in data.data) {
      //   if(data.data.hasOwnProperty(tmp)) {
      //     this.users += 'username: ' + data.data[tmp].username + '  password: ' + data.data[tmp].password + '  success: ' + data.data[tmp].success + '\n';
      //   }
      // }
    }, (error) => {
      for(let err in error.error) {
        if(error.hasOwnProperty(err)) {
          console.log(err + ': ' + error.error[err]);
        }
      }
    });
  }
}
