import { Component, OnInit } from '@angular/core';
import { Observable } from '@rxjs'
import { AdminPatientService } from '../services/admin-patient.service';

// Define an interface for a note
// This will be used to typecheck incoming objects
// and return a notes object of this form
interface noteType {
    message: string
}

@Component({
    selector: 'notes',
    templateUrl: './notes.component.html',
    styleUrls: ['./notes.component.css']
})



export class NotesComponent implements OnInit {

    /*
     * Data members for the notes component, content of the notes and patient ID
     * for the corrosponding patient. 
    */
    public content: string;


    constructor(private adminPatientService: AdminPatientService) {
        this.content = '';
    }

    public ngOnInit() {
    }

    // Placeholder for CLIENT/API getNotes request
    // Checks for correct types, copys and returns a note object
    // if match. Otherwise throws an error
    public getNotesQuery(): void {
        let tmpData: noteType = JSON.parse(JSON.stringify(this.constructTestData()));

        if (typeof (tmpData.message) === 'string') {

            this.content = tmpData.message;
        } else {
            console.error('Incorrect Types!');
        }
    }
    // returns the input from the user
    // TODO: make function return ClientNotes obj
    // from api-objects 
    public submitNote(patientId: number): noteType {

        if (!this.content) {

            alert('Please enter a note!');

        } else if (typeof (this.content) === 'string') {
            this.adminPatientService.updateNotes(patientId, this.content).subscribe(
                _ => {
                    alert('SUCCESSFUL UPDATE!!!');
                }
            );
            return {
                message: this.content
            };

        } else {
            console.error('Doesnt work');
            return null;
        }
    }

    public loadNotes(notes: string) {
        this.content = notes;
    }

    public getNotes(patientId: number) {
        this.adminPatientService.getPatient(patientId).subscribe(
            result => {
                this.content = result.data[0].patientnotes;
            }
        )
    }

    //TESTING: Load notes with dummy data
    public constructTestData(): object {
        return {
            'status': 200,
            'confirmation': 'Success',
            'content': 'Dummy text, just a placeholder for actual notes',
            'id': 1234
        };
    }

}
