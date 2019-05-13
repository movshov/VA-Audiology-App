import { Injectable } from '@angular/core';
import { Utilities } from '../common/utlilities';
import { ServerApiService } from './server-api.service';
import {AppointmentSubmission, PatientSurveyJSON, PatientJSON} from '../../../api-objects/AppointmentSubmission'



@Injectable()
export class SurveySubmitHandler {

  constructor(private serverApiService: ServerApiService) { }

  // Note that anything passed in here is data that is not
  // accessible via session storage.
  public submitSurvey(thsScoreVars : Map<string, number>, tfiVars : Map<string, number>, tsType : string) {
    if(thsScoreVars == null) {
      throw new Error('No THS Score Data');
    }

    if(tsType == null || tsType === '') {
      throw new Error('Unknown TS Type');
    }

    let testDataString = Utilities.getSessionStorage('tests-data');
    let testData = JSON.parse(testDataString);

    let result = new AppointmentSubmission();
    result.patientSurvey = this.buildPatientSurveyJSON(testData, thsScoreVars, tfiVars, tsType);
    result.patient = this.buildPatientJSON();

    if(result.patientSurvey == null) {
      throw new Error('Failed to build patient survey. Either no survey data, or ts type is unknown');
    }

    if(result.patient == null) {
      throw new Error('No patient data');
    }
    this.serverApiService.post<string>('appointments', result).subscribe(
      result => {
        console.log(result);
      });

    console.log(JSON.stringify(result));
  }

  buildPatientSurveyJSON(testData, thsScoreVars : Map<string, number>, tfiVars : Map<string, number>, tsType : string) : PatientSurveyJSON {
    if(thsScoreVars == null || tsType == null || tsType == '') {
      return null;
    }

    let result : PatientSurveyJSON = new PatientSurveyJSON;

    result.tsTinnitusType = tsType;

    // Although we recieve a boolean value, we do not care about its
    // result since the recommended test data does not need to exist for
    // us to submit a patient survey.
    this.buildRecommendedTestJsonPropertiesFromTestsData(result, testData);

    // Once more, this returns a boolean, but we do not care about its
    // result. That is because the user may not take the tfi portion of
    // the survey.
    this.buildTfiJsonValues(result, tfiVars);

    result.thsSectionATotal = thsScoreVars.get("thsA");
    result.thsSectionBTotal = thsScoreVars.get("thsB");
    result.thsSectionCSeverity = thsScoreVars.get("thsC");
    // TODO: Add THS EXAMPLE TEST:
    // result.ths_sectionc_example = 

    return result;
  }

  buildRecommendedTestJsonPropertiesFromTestsData(storeIn : PatientSurveyJSON, testData) : boolean {
    if(testData == null) {
      return false;
    }

    storeIn.audiogram = this.getPropertyValue(testData, 'audiogramType');

    storeIn.otoscopy = this.getPropertyValue(testData, 'otoscopyType');
    storeIn.typanometry = this.getPropertyValue(testData, 'tympanometryType');

    storeIn.rightEarHighFreqSeverity = this.getPropertyValue(testData, 'rightHighSev');
    storeIn.rightEarLowFreqSeverity = this.getPropertyValue(testData, 'rightLowSev');
    storeIn.rightEarHighFreqConfiguration = this.buildFreqConfig(testData, 'rightHigh');
    storeIn.rightEarLowFreqConfiguration = this.buildFreqConfig(testData, 'rightLow');

    storeIn.leftEarHighFreqSeverity = this.getPropertyValue(testData, 'leftHighSev');
    storeIn.leftEarLowFreqSeverity = this.getPropertyValue(testData, 'leftLowSev');
    storeIn.leftEarHighFreqConfiguration = this.buildFreqConfig(testData, 'leftHigh');
    storeIn.leftEarLowFreqConfiguration = this.buildFreqConfig(testData, 'leftLow');

    return true;
  }

  buildPatientJSON() : PatientJSON {
    let patientID = Utilities.getSessionStorage('patient-id');

    if(patientID == null) {
      return null;
    }

    let result = new PatientJSON;
    result.patienID = patientID;

    return result;
  }

  buildTfiJsonValues(storeIn : PatientSurveyJSON, tfiVars : Map<string, number>) : boolean {
    if(tfiVars == null) {
      return false;
    }

    storeIn.tfiI = tfiVars.get("intrusive");
    storeIn.tfiSc = tfiVars.get("sense");
    storeIn.tfiC = tfiVars.get("cognitive");
    storeIn.tfiSi = tfiVars.get("sleep");
    storeIn.tfiA = tfiVars.get("auditory");
    storeIn.tfiR = tfiVars.get("relaxation");
    storeIn.tfiQ = tfiVars.get("quality");
    storeIn.tfiE = tfiVars.get("emotional");
    storeIn.tfiOverallScore = tfiVars.get("overallTFI");

    return true;
  }

  buildFreqConfig(testData, configType : string) : string {
    let result : string = '';

    let symmetric = this.getPropertyValue(testData, configType + 'ConfigSymmetric');
    let asymmetric = this.getPropertyValue(testData, configType + 'ConfigAsymmetric');
    let progressive = this.getPropertyValue(testData, configType + 'ConfigProgressive');
    let sudden = this.getPropertyValue(testData, configType + 'ConfigSudden');
    let flat = this.getPropertyValue(testData, configType + 'ConfigFlat');
    let rising  = this.getPropertyValue(testData, configType + 'ConfigRising');
    let cookieBite = this.getPropertyValue(testData, configType + 'ConfigCookie Bite');
    let precipitous = this.getPropertyValue(testData, configType + 'ConfigPrecipitous');
    let noiseNotch = this.getPropertyValue(testData, configType + 'ConfigNoise-Notch');
    let corner = this.getPropertyValue(testData, configType + 'ConfigCorner');

    if(symmetric !== '' && symmetric !== 'false') {
      result = (result.concat('Symmetric')).concat(';');
    }

    if(asymmetric !== '' && asymmetric !== 'false') {
      result = (result.concat('Asymmetric')).concat(';');
    }

    if(progressive !== '' && progressive !== 'false') {
      result = (result.concat('Progressive')).concat(';');
    }

    if(sudden != '' && sudden !== 'false') {
      result = (result.concat('Sudden')).concat(';');
    }

    if(flat != '' && flat !== 'false') {
      result = (result.concat('Flat')).concat(';');
    }

    if(rising != '' && rising !== 'false') {
      result = (result.concat('Rising')).concat(';');
    }

    if(cookieBite != '' && cookieBite !== 'false') {
      result = (result.concat('CookieBite')).concat(';');
    }

    if(precipitous != '' && precipitous !== 'false') {
      result = (result.concat('Precipitous')).concat(';');
    }

    if(noiseNotch != '' && noiseNotch !== 'false') {
      result = (result.concat('NoiseNotch')).concat(';');
    }

    if(corner != '' && corner !== 'false') {
      result = (result.concat('Corner')).concat(';');
    }

    return result;
  }

  getPropertyValue(testData, property : string) : string {
    if(testData == null || testData.length < 1) {
      return '';
    }

    let result : string = '';

    let i : number;
    for(i = 0; i < testData.length; i++) {
      if(testData[i]['name'] === property) {
        result = testData[i]['value'];
        break;
      }
    }

    return result;
  }
}
