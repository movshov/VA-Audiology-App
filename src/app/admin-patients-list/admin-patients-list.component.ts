import { Component, OnInit, Input, Inject } from '@angular/core';
import { PatientResponse } from '../../../api-objects/PatientResponse';
import { CustomerSearchService } from '../customer-search/customer-search.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { AdminPatientListModalComponent } from './admin-patient-list-modal/admin-patient-list-modal.component';
import { AdminPatientService } from '../services/admin-patient.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'admin-patients-list',
  templateUrl: './admin-patients-list.component.html',
  styleUrls: ['./admin-patients-list.component.css']
})
export class AdminPatientsListComponent implements OnInit {
  public patients: Array<PatientResponse> = [];
  public currentPage: number = 0;

  constructor(
    public dialog: MatDialog,
    private adminPatientService: AdminPatientService,
    private notificationService: NotificationService
  ) { }

  public ngOnInit() {
    this.loadPatients();
  }

  public deletePatient(patient: PatientResponse) {
    const dialogRef = this.dialog.open(AdminPatientListModalComponent, { data: { patientid: patient.patientid } });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirm') {
        this.adminPatientService.deletePatient(patient.patientid).subscribe(
          _ => {
            this.notificationService.showSuccess("Success: Patient " + patient.patientid + ' was successfully deleted');
            this.loadPatients();
          }
        )
      } else {
        console.log('Cancel operation');
      }
    });
  }

  public loadPatient(patient: PatientResponse) {
    // Load version of customer search with this patient ID and ability to delete an appointment
    console.log('load patient: ' + patient.patientid);
  }

  private loadPatients() {
    this.adminPatientService.getPatients().subscribe(
      response => {
        this.patients = response.data;
        this.patients.sort((a: PatientResponse, b: PatientResponse) => {
          let id1 = a.patientid;
          let id2 = b.patientid;
          let diff = id1.valueOf() - id2.valueOf();
          if (diff > 0) {
            return 1;
          } else if (diff < 0) {
            return -1;
          }
          return 0;
        });
      }
    )
  }

  // pagination functions
  public prevPage(amt: number) {
    while (this.currentPage > 0 && amt > 0) {
      this.currentPage--;
      amt--;
    }
  }
  public nextPage(amt: number) {
    while ((this.currentPage + 1) * 10 < this.patients.length && amt > 0) {
      this.currentPage++;
      amt--;
    }
  }

}
