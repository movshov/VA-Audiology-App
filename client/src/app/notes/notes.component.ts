import { Component, OnInit } from '@angular/core';
import { AdminPatientService } from '../services/admin-patient.service';
import { Utilities } from '../common/utlilities';
import { NotificationService } from '../services/notification.service';

@Component({
    selector: 'notes',
    templateUrl: './notes.component.html',
    styleUrls: ['./notes.component.css']
})

export class NotesComponent implements OnInit {

    public content: string = '';

    constructor(private adminPatientService: AdminPatientService, private notificationService: NotificationService) { }

    public ngOnInit() { }

    // Calls getPatient service, and retrieves patient notes.
    public loadNotes(patientID: number): void {
        this.adminPatientService.getPatient(patientID).subscribe((result) => {
            this.content = result.data[0].patientnotes;
        }, (error) => {
            console.error('Loading notes Failed!', error.statusText);
        });
    }
    // calls the updateNotes service from patientAdminService
    public submitNote(patinetID: number, displayPopup?: boolean): void {
        if (typeof (this.content) === 'string') {
            this.adminPatientService.updateNotes(patinetID, this.content).subscribe((_) => {
                if (displayPopup) {
                    this.notificationService.showSuccess('Notes For Patient ' + patinetID + ' updated successfully');
                }
            });
        }
    }

    public updateNote() {
        let patientId: number = parseInt(Utilities.getSessionStorage('patient-id'));
        this.submitNote(patientId, true);
    }
}
