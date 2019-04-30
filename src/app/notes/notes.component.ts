import { Component, OnInit } from '@angular/core';
import { Observable } from '@rxjs'

// Define an interface for a note
// This will be used to typecheck incoming objects
// and return a notes object of this form
interface noteType {
    message: string ,
    patientID: string
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
  public id: string;
	

  constructor() { 
      this.content = '';
      this.id = '';
  }

  public ngOnInit() {
  }

// Placeholder for CLIENT/API getNotes request
// Checks for correct types, copys and returns a note object
// if match. Otherwise throws an error
  public getNotesQuery(): void{
		let tmpData: noteType = JSON.parse(JSON.stringify(this.constructTestData()));

		if(typeof(tmpData.message) === 'string' && typeof(tmpData.patientID) === 'string') {

            this.content = tmpData.message;
            this.id = tmpData.patientID;
        } else {
            console.error('Incorrect Types!');
        }
	}
// returns the input from the user
// TODO: make function return ClientNotes obj
// from api-objects 
  public submitNote(): noteType {

      if(!this.content) {
          
          alert('Please enter a note!');

      } else {
          
         return {
              message : this.content ,
              patientID : this.id
          };
        }
  }


//TESTING: Load notes with dummy data
  public constructTestData():object {
      return { 
               'status': 200,
               'confirmation': 'Success',
               'content': 'Dummy text, just a placeholder for actual notes',
               'id': 1234
             }; 
    }

}
