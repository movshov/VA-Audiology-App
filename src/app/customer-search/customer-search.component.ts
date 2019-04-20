import { Component, OnInit, Injector, ComponentFactoryResolver, ApplicationRef } from '@angular/core';

@Component({
  selector: 'customer-search',
  templateUrl: './customer-search.component.html',
  styleUrls: ['./customer-search.component.css']
})
export class CustomerSearchComponent implements OnInit {
  public idSearch: string;
  public searchBtn: boolean = true;
  public resultsTable = [];
  public currentPage: number = 0;

  constructor() { }

  ngOnInit() {
  }

  // Parses the JSON and puts it into an array to create the table of appointments
  // sorts by date, most recent first.
  public patientSearch() {
    this.searchBtn = false;
    let appts = JSON.parse(this.queryDB());
    this.resultsTable = [];
    this.currentPage = 0;
    for(let appt in appts) {
      this.resultsTable.push(appts[appt]);
    }
    this.resultsTable.sort((a,b) => {
      let date1 = new Date(a.date);
      let date2 = new Date(b.date);
      if(date1.valueOf() < date2.valueOf()) {
        return 1;
      }
      return -1;
    })
    this.searchBtn = true;
  }
  // This function will actually load the selected appointment into sessionStorage and tell
  // audiologist-navigation to change state
  public loadAppt(appt) {
    console.log('appt: ' + appt.date);
  }

  // This function will be changed to call the service that talks to the DB
  private queryDB(): string {
    let appts: string = '{';
    let numResults = Math.floor(Math.random() * 33);
    for (let i = 0; i < numResults; i++) {
      let tmp = '';
      if (i > 0) { tmp = ',' };
      tmp += '"' + i + '"' + ':' + JSON.stringify({
        id: this.idSearch,
        date: this.randomDate(),
        apptID: Math.floor(Math.random() * 9999)
      });
      appts += tmp;
    }
    appts += '}';
    return appts;
  }
  // This will be removed, only used to get random date for testing.
  private randomDate(): string {
    let month = Math.floor(Math.random() * 12) + 1;
    let day = Math.floor(Math.random() * 28) + 1;
    let year = Math.floor(Math.random() * 2) + 2018;
    return month + '/' + day + '/' + year;
  }

}
