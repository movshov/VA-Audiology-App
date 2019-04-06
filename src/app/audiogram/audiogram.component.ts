import { Component, OnInit, Output } from '@angular/core';
import { Utilities } from '../common/utlilities';
import { EventEmitter } from '@angular/core';
import { MatRadioChange } from '@angular/material';
import { TestsDataService } from '../services/tests-data.service';

/*
Audiogram Test Component for the audiologist view:
Displays all the labels, radio buttons and checkboxes.
This component does not save information to any data services/databases
*/
@Component({
  selector: 'audiogram',
  templateUrl: './audiogram.component.html',
  styleUrls: ['./audiogram.component.css']
})

export class AudiogramComponent implements OnInit {

  public patientID: string = Utilities.getSessionStorage('patient-id');

  constructor(private dataService: TestsDataService){}

  // Text for test type radio buttons in the template
  public testTypes = [
    'Conductive',
    'Sensorineural',
    'Mixed'
  ];

  // Text for Serverity radio buttons in the template
  public severities = [
    'Normal',
    'Moderate',
    'Moderate/Severe',
    'Severe',
    'Profound'
  ];

  // Text for configurations checkboxes in the template
  public configurations = [
    'Symmetric',
    'Asymmetric',
    'Progressive',
    'Sudden',
    'Flat',
    'Rising',
    'Cookie Bite',
    'Precipitous',
    'Noise-Notch',
    'Corner'
  ];

  public ngOnInit() { }

  public typeChange(event: MatRadioChange) {
    console.log("Clicked: " + event.value + " : " + event.source);
    this.dataService.saveData('audiogramType', event.value);
  }
  public severityChange(event: MatRadioChange) {
    switch(event.source.name) {
      case 'leftHigh':
        this.dataService.saveData('leftHighSev', event.value);
        break;
      case 'leftLow':
        this.dataService.saveData('leftLowSev', event.value);
        break;
      case 'rightHigh':
        this.dataService.saveData('rightHighSev', event.value);
        break;
      case 'rightLow':
        this.dataService.saveData('rightLowSev', event.value);
        break;
    }
  }
}
