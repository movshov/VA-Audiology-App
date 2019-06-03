import { Router } from '@angular/router';
import { ViewChild, Component, ViewEncapsulation, OnInit } from '@angular/core';
import { AudiologistSummaryComponent, tfiNames } from '../audiologist-summary/audiologist-summary.component';
import { Utilities } from '../common/utlilities';
import { State, StatesEnum, TabsEnum } from './navigation-aids';
import { Appointment } from '../../../../api-objects/Appointment';
import { CustomerSearchService } from '../customer-search/customer-search.service';
import { NotesComponent } from '../notes/notes.component';
import { NotificationService } from '../services/notification.service';
import { CustomerSearchComponent } from '../customer-search/customer-search.component';
import { PatientResponse } from '../../../../api-objects/patientResponse';

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
export class AudiologistNavigationComponent implements OnInit {
  get TabsEnum() { return TabsEnum; }
  public patientID: string = Utilities.getSessionStorage('patient-id');
  public active: boolean = true;
  public scale: number = 0.55;
  public state: State = new State();
  @ViewChild(AudiologistSummaryComponent) private summaryComponent: AudiologistSummaryComponent;
  @ViewChild(NotesComponent) private notesComponent: NotesComponent;
  @ViewChild(CustomerSearchComponent) private customerSearch: CustomerSearchComponent;


  constructor(private router: Router, private customerSearchService: CustomerSearchService, private notificationService: NotificationService) {
  }

  public ngOnInit() {
    if (this.summaryComponent.ts === '' || this.summaryComponent.ts === null) {
      this.state.determineState(false);
    } else {
      this.state.determineState(true, false);
    }
    if (this.patientID) {
      this.notesComponent.loadNotes(parseInt(this.patientID, 10));
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
      this.notesComponent.submitNote(parseInt(this.patientID, 10));
      this.summaryComponent.submitSurvey().subscribe(
        (_) => {
          this.notificationService.showSuccess('Survey was successfuly Submitted');
          this.logout();
        });
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
      'ts-history',
      'appt'
    ];
    sessionKeys.forEach((value) => {
      Utilities.removeItemFromSessionStorage(value);
    });
    this.patientID = null;
    this.state.determineState(false);
  }

  public logout() {
    this.clearData();
    Utilities.removeItemFromSessionStorage('userId');
    Utilities.removeItemFromSessionStorage('sessionId');
    Utilities.removeItemFromSessionStorage('permissions');
    this.router.navigateByUrl('/home');
  }

  public onApptLoad(appt: Appointment) {
    this.patientID = appt.patientid.toString();
    Utilities.setSessionStorage('patient-id', appt.patientid.toString());
    this.notesComponent.loadNotes(appt.patientid);
    this.summaryComponent.loadAppointment(appt);
    this.state.determineState(true, true);
  }

  public downloadSpreadsheet() {
    this.customerSearchService.getAllAppointments().subscribe();
  }

  public onLoadPatientSearch(patientId: PatientResponse) {
    this.customerSearch.loadCustomerSearch(patientId.patientid);
    this.state.selectTab(TabsEnum.SEARCH);
  }
}
