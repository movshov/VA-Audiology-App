import { Injectable } from '@angular/core';
import { Utilities } from '../common/utlilities';

// Holds test results entered
@Injectable()
export class TestsDataService {
  public data: Array <{name: string, value: string}> = [];

  constructor() { }

  public onInit() {
    if(JSON.parse(Utilities.getSessionStorage('tests-data'))) {
      this.data = JSON.parse(Utilities.getSessionStorage('tests-data'));
    }
  }

  public saveData(name: string, value: string): void {
    if(this.data.length > 0) {
      let index: number = this.data.findIndex((x) => x.name === name);
      if(index !== -1) {
        this.data.splice(index, 1);
      }
    }
    this.data.push({name, value});
    this.updateSessionStorage();
  }

  public updateSessionStorage(): void {
    Utilities.setSessionStorage('tests-data', JSON.stringify(this.data));
  }
}
