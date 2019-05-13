import { Component, OnInit } from '@angular/core';
import { PatientResponse } from '../../../api-objects/PatientResponse';
import { CustomerSearchService } from '../customer-search/customer-search.service';

@Component({
  selector: 'admin-patients-list',
  templateUrl: './admin-patients-list.component.html',
  styleUrls: ['./admin-patients-list.component.css']
})
export class AdminPatientsListComponent implements OnInit {
  public patients: Array<PatientResponse> = [];
  public currentPage: number = 0;

  constructor(
    private customerSearchService: CustomerSearchService
  ) { }

  public ngOnInit() {
    this.loadPatients();
  }

  public deletePatient(patient: PatientResponse) {
    console.log('delete patient: ' + patient.patientid);
  }

  public loadPatient(patient: PatientResponse) {
    console.log('load patient?: ' + patient.patientid);
  }

  private loadPatients() {
    this.patients = new Array<PatientResponse>();
    let patient: PatientResponse;
    for (let i = 0; i < 20; i++) {
      patient = new Object as PatientResponse;
      patient.deceased = Math.random() >= 0.5;
      patient.patientid = Math.floor(Math.random() * 10000);
      patient.patientnotes = Math.random().toString(36) + ' ' + Math.random().toString(36) + ' ' + Math.random().toString(36) + ' ' + Math.random().toString(36) + ' ' + Math.random().toString(36) + ' ' + Math.random().toString(36) + ' ' + Math.random().toString(36) + ' ' + Math.random().toString(36) + ' ' + Math.random().toString(36) + ' ' + Math.random().toString(36) + ' ' + Math.random().toString(36) + ' ' + Math.random().toString(36) + ' ' + Math.random().toString(36) + ' ' + Math.random().toString(36);
      this.patients.push(patient);
    }
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
