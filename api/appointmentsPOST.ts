import handler from './handler';
import db from './db';
import { QueryResult } from 'pg';

export default handler(async (request: any) => {

  let connection = db();
  const client = await connection.connect();

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



  let tfisurvey_sql = "INSERT INTO tfisurvey (patientid, tfi_i, tfi_sc, tfi_c, tfi_si, tfi_a, tfi_r, tfi_q, tfi_e, tfi_overallscore) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *";
  let tfisurvey_values = [patientid, tfi_i, tfi_sc, tfi_c, tfi_si, tfi_a, tfi_r, tfi_q, tfi_e, tfi_overallscore];

  let thssurvey_sql = "INSERT INTO thssurvey (patientid, ths_sectiona, ths_sectionb, ths_sectionc, ths_sectionc_example) VALUES ($1, $2, $3, $4, $5) RETURNING *";
  let thssurvey_values = [patientid, ths_sectiona, ths_sectionb, ths_sectionc, ths_sectionc_example];

  let tssurvey_sql = "INSERT INTO tssurvey (patientid, ts_type) VALUES ($1, $2) RETURNING *";
  let tssurvey_values = [patientid, ts_type];

  let audiologistexam_sql = "INSERT INTO audiologistexams (tympanometrytype, otoscopytype, rightear_lowf_severity, rightear_highf_severity, leftear_lowf_severity, leftear_highf_severity, rightear_lowf_configuration, rightear_highf_configuration, leftear_lowf_configuration, leftear_highf_configuration, audiogramtype) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *";
  let audiologistexam_values = [tympanometrytype, otoscopytype, rightear_lowf_severity, rightear_highf_severity, leftear_lowf_severity, leftear_highf_severity, rightear_lowf_configuration, rightear_highf_configuration, leftear_lowf_configuration, leftear_highf_configuration, audiogramtype];


  // Appointments inserted last because it needs info from the other tables
  try {
    await Promise.all([
      client.query(tfisurvey_sql, tfisurvey_values),
      client.query(thssurvey_sql, thssurvey_values),
      client.query(tssurvey_sql, tssurvey_values),
      client.query(audiologistexam_sql, audiologistexam_values)
    ]).then(values => {
      let tfisurveyid = values[0].rows[0].tfisurveyid;
      let thssurveyid = values[1].rows[0].thssurveyid;
      let tssurveyid = values[2].rows[0].tssurveyid;
      let audiologistexamsid = values[3].rows[0].audiologistexamsid;

      let appointment_sql = "INSERT INTO appointments (authorityid, patientid, tfisurveyid, thssurveyid, tssurveyid, audiologistexamsid, appointmentdatetime) VALUES ($1, $2, $3, $4, $5, $6, NOW())"
      let appointment_values = [authorityid, patientid, tfisurveyid, thssurveyid, tssurveyid, audiologistexamsid]
      client.query(appointment_sql, appointment_values)

      return { tfisurveyid,  thssurveyid, tssurveyid};
    })
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }

});
