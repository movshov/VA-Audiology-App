import { Utilities } from '../app/common/utlilities';

export class SubmitSurveyHandler {
  public doSubmitSurvey() : void {
    console.log('PATIENT INFORMATION');
    console.log('----------------------------------------');
    console.log(Utilities.getSessionStorage('patient-id'));
    console.log('----------------------------------------');

    console.log('SURVEY DATA');
    console.log('----------------------------------------');

    this.submitSurveyComponentTS();
    this.submitSurveyComponentTHS();
    this.submitSurveyComponentTFI();

    console.log('----------------------------------------');
  }

  submitSurveyComponentTS() : void {
    console.log('TS SURVEY RESULTS');
    console.log(Utilities.getSessionStorage('ts-dataRecord'));
  }

  submitSurveyComponentTHS() : void {
    console.log('THS SURVEY RESULTS');
    console.log(Utilities.getSessionStorage('ths-dataRecord'));
  }

  submitSurveyComponentTFI() : void {
    console.log('TFI SURVEY RESULTS');
    console.log(Utilities.getSessionStorage('tfi-dataRecord'));
  }
}
