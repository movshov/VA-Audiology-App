import handler from './handler';
import db from './db';
import { AppointmentSubmission } from '../api-objects/AppointmentSubmission';
import * as auth from './authenticate';

let tfi_datapoints: string[] = [
  'patientid',
  'tfi_i',
  'tfi_sc',
  'tfi_c',
  'tfi_si',
  'tfi_a',
  'tfi_r',
  'tfi_q',
  'tfi_e',
  'tfi_overallscore'
];
let ths_datapoints: string[] = [
  'patientid',
  'ths_sectiona',
  'ths_sectionb',
  'ths_sectionc',
  'ths_sectionc_example'
];
let ts_datapoints: string[] = [
  'patientid',
  'ts_type'
]
let audiologistexams_datapoints: string[] = [
  'tympanometrytype',
  'otoscopytype',
  'rightear_lowf_severity',
  'rightear_highf_severity',
  'leftear_lowf_severity',
  'leftear_highf_severity',
  'rightear_lowf_configuration',
  'rightear_highf_configuration',
  'leftear_lowf_configuration',
  'leftear_highf_configuration',
  'audiogramtype'
]

let appointment_datapoints: string[] = [
  'authorityid',
  'patientid',
  'tfisurveyid',
  'thssurveyid',
  'tssurveyid',
  'audiologistexamsid',
  'appointmentdatetime'
]
let appointment_datapoints_MAP: string[] = [
  'authorityid',
  'patientid',
  'tfisurveyid',
  'thssurveyid',
  'tssurveyid',
  'audiologistexamsid',
]

export default handler(async (request: any, userId) => {

  let requestVars: AppointmentSubmission = new AppointmentSubmission(request.body);
  let body = requestVars.exportToSQLVars();

  return await db(async (connection) => {
    // Take data from request and build sql call from i
    let tfisurvey_sql: string = "INSERT INTO tfisurvey (" + tfi_datapoints.join() + ") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *";
    let tfisurvey_value: number[] = tfi_datapoints.map((value) => body[value])

    let thssurvey_sql: string = "INSERT INTO thssurvey (" + ths_datapoints.join() + ") VALUES ($1, $2, $3, $4, $5) RETURNING *";
    let thssurvey_values = ths_datapoints.map((value) => body[value])

    let tssurvey_sql: string = "INSERT INTO tssurvey (" + ts_datapoints.join() + ") VALUES ($1, $2) RETURNING *";
    let tssurvey_values = ts_datapoints.map((value) => body[value])

    let audiologistexam_sql: string = "INSERT INTO audiologistexams (" + audiologistexams_datapoints.join() + ") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *";
    let audiologistexam_values = audiologistexams_datapoints.map((value) => body[value]);

    // Appointments inserted last because it needs info from the other tables
    const values = await Promise.all([
      connection.query(tfisurvey_sql, tfisurvey_value),
      connection.query(thssurvey_sql, thssurvey_values),
      connection.query(tssurvey_sql, tssurvey_values),
      connection.query(audiologistexam_sql, audiologistexam_values)
    ]).then(values => {

      body['tfisurveyid'] = values[0].rows[0].tfisurveyid;
      body['thssurveyid'] = values[1].rows[0].thssurveyid;
      body['tssurveyid'] = values[2].rows[0].tssurveyid;
      body['audiologistexamsid'] = values[3].rows[0].audiologistexamsid;
      body['authorityid'] = userId;

      let appointment_sql = "INSERT INTO appointments (" + appointment_datapoints.join() + ") VALUES ($1, $2, $3, $4, $5, $6, NOW())";
      let appointment_values = appointment_datapoints_MAP.map((value) => body[value]);

      connection.query(appointment_sql, appointment_values);
      return { success: true };
    }).catch(err => {
      throw err;
    })
    return values;
  });
}, auth.authenticate);
