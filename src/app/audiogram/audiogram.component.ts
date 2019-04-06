import { Component, OnInit, Output } from '@angular/core';
import { Utilities } from '../common/utlilities';
import { EventEmitter } from '@angular/core';
import { MatRadioChange } from '@angular/material';

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
    Utilities.setSessionStorage('audiogramType', event.value);
  }
  public severityChange(event: MatRadioChange) {
    console.log("event.value: " + event.value);
    console.log(event.source.name);
    switch(event.source.name) {
      case 'leftHigh':
        Utilities.setSessionStorage('leftHighSev', event.value);
        break;
      case 'leftLow':
        Utilities.setSessionStorage('leftLowSev', event.value);
        break;
      case 'rightHigh':
        Utilities.setSessionStorage('rightHighSev', event.value);
        break;
      case 'rightLow':
        Utilities.setSessionStorage('rightLowSev', event.value);
        break;
    }
  }
}
