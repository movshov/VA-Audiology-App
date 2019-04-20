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

  // Gets JSON from queryDB() puts it into an array to create the table of appointments
  // sorts by date, most recent first.
  public patientSearch() {
    this.searchBtn = false;
    let appts = this.queryDB();
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
  // CHANGE this function to actually load the selected appointment into sessionStorage and tell
  // audiologist-navigation to change state
  public loadAppt(appt) {
    console.log('appt: ' + appt.date);
  }
  // pagination functions
  public prevPage(amt: number) {
    while(this.currentPage > 0 && amt > 0) {
      this.currentPage--;
      amt--;
    }
  }
  public nextPage(amt: number) {
    while((this.currentPage + 1) * 10 < this.resultsTable.length && amt > 0) {
      this.currentPage++;
      amt--;
    }
  }

  // CHANGE this function to call the service that talks to the DB
  // Should still return a JSON Object
  private queryDB(): Object {
    let appts: string = '{';
    let numResults = Math.floor(Math.random() * 100);
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
    return JSON.parse(appts);
  }
  // REMOVE, only used to get random date for testing.
  private randomDate(): string {
    let month = Math.floor(Math.random() * 12) + 1;
    let day = Math.floor(Math.random() * 28) + 1;
    let year = Math.floor(Math.random() * 4) + 2016;
    return month + '/' + day + '/' + year;
  }

}
