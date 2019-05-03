import handler from './handler';
import db from './db';
import { QueryResult } from 'pg';

export default handler(async (request: any) => {
  
  return await db(async (connection) => {
    // Take data from request and build sql call from it
  // TODO: Move this data structure to it's own class
  const {
    //Sharded Values
    patientid,
    //TFI Survey
    tfi_i,
    tfi_sc,
    tfi_c,
    tfi_si,
    tfi_a,
    tfi_r,
    tfi_q,
    tfi_e,
    tfi_overallscore,
    //THS Survey
    ths_sectiona,
    ths_sectionb,
    ths_sectionc,
    ths_sectionc_example,
    //TS Survey
    ts_type,
    //Appointment
    authorityid,
    //tfisurveyid,
    //thssurveyid,
    //tssurveyid,
    appointmentdatetime,
    tympanometrytype, 
    otoscopytype, 
    rightear_lowf_severity, 
    rightear_highf_severity, 
    leftear_lowf_severity, 
    leftear_highf_severity, rightear_lowf_configuration, rightear_highf_configuration, leftear_lowf_configuration, leftear_highf_configuration, audiogramtype
  } = request.body;

  let tfi_datapoints : string[]  = [
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

  let ths_datapoints : string[] = [
    'patientid',
    'ths_sectiona',
    'ths_sectionb',
    'ths_sectionc',
    'ths_sectionc_example'  
  ];

  let ts_datapoints : string[] = [
    'patientid',
    'ts_type'
  ]

  let audiologistexams_datapoints : string[] = [
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

  let tfisurvey_sql : string = "INSERT INTO tfisurvey (" + tfi_datapoints.join() + ") VALUES ("+ tfi_datapoints.map((value, index) => request.body[value]) + ") RETURNING *"; 
  
  let thssurvey_sql : string = "INSERT INTO thssurvey (" + ths_datapoints.join() + ") VALUES (" + ths_datapoints.map((value, index) => {
    if (value == 'ths_sectionc_example') {
      return "'" + request.body[value] + "'"
    }
    else{
      return request.body[value]
    } 
    
  }) + ") RETURNING *";

  let tssurvey_sql : string = "INSERT INTO tssurvey (" + ts_datapoints.join() + ") VALUES (" + ts_datapoints.map((value, index) => {
    if (value == 'ts_type') {
      return "'" + request.body[value] + "'"
    }
    else{
      return request.body[value]
    } 
  }) + ") RETURNING *";

  let audiologistexam_sql : string = "INSERT INTO audiologistexams (" + audiologistexams_datapoints.join() + ") VALUES (" + audiologistexams_datapoints.map((value, index) => ("'" + request.body[value] + "'") ) + ") RETURNING *";

  //return {tfisurvey_sql,thssurvey_sql,tssurvey_sql,audiologistexam_sql}

  // Appointments inserted last because it needs info from the other tables
    await Promise.all([
      connection.query(tfisurvey_sql),
      connection.query(thssurvey_sql),
      connection.query(tssurvey_sql),
      connection.query(audiologistexam_sql)
    ]).then(values => {
      
      let tfisurveyid = values[0].rows[0].tfisurveyid;
      let thssurveyid = values[1].rows[0].thssurveyid;
      let tssurveyid = values[2].rows[0].tssurveyid;
      let audiologistexamsid = values[3].rows[0].audiologistexamsid;

      let appointment_sql = "INSERT INTO appointments (authorityid, patientid, tfisurveyid, thssurveyid, tssurveyid, audiologistexamsid, appointmentdatetime) VALUES ($1, $2, $3, $4, $5, $6, NOW())"
      let appointment_values = [authorityid, patientid, tfisurveyid, thssurveyid, tssurveyid, audiologistexamsid]
      connection.query(appointment_sql, appointment_values)

      return { tfisurveyid,  thssurveyid, tssurveyid};
    }).catch(err => console.log(err))

  });
});
