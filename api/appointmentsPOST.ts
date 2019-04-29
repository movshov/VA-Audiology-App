import handler from './handler';
import db from './db';
import { connect } from 'tls';

export default handler(async (request : any) => {

  let connection = db();
  const client = await connection.connect()

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
    tfisurveyid,
    thssurveyid,
    tssurveyid,
    audiologistexamsid,
    appointmentdatetime
  } = request.body



  let tfisurvey_sql = "INSERT INTO tfisurvey (patientid, tfi_i, tfi_sc, tfi_c, tfi_si, tfi_a, tfi_r, tfi_q, tfi_e, tfi_overallscore) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *"
  let tfisurvey_values = [patientid, tfi_i, tfi_sc, tfi_c, tfi_si, tfi_a, tfi_r, tfi_q, tfi_e, tfi_overallscore]
  
  let thssurvey_sql = "INSERT INTO thssurvey (patientid, ths_sectiona, ths_sectionb, ths_sectionc, ths_sectionc_example) VALUES ($1, $2, $3, $4, $5) RETURNING *"
  let thssurvey_values = [patientid, ths_sectiona, ths_sectionb, ths_sectionc, ths_sectionc_example]
  
  let tssurvey_sql = "INSERT INTO tssurvey (patientid, ts_type) VALUES ($1, $2) RETURNING *"
  let tssurvey_values = [patientid, ts_type]

  // Appointments inserted last because it needs info from the other tables
  let appointment_sql = "INSERT INTO appointments (authorityid, patientid, tfisurveyid, thssurveyid, tssurveyid, audiologistexamsid, appointmentdatetime) VALUES ($1, $2, $3, $4, $5, $6, $7)"
  let appointment_values = [authorityid, patientid, tfisurveyid, thssurveyid, tssurveyid, audiologistexamsid, appointmentdatetime]

  try {
    await client.query('BEGIN')
    //connection.query(tfisurvey_sql, tfisurvey_values)
    //connection.query(thssurvey_sql, thssurvey_values)
    //connection.query(tssurvey_sql, tssurvey_values)
    connection.query(appointment_sql, appointment_values)
    await connection.query('COMMIT')
  } catch (error) {
    await client.query('ROLLBACK')
    throw error
  } finally {
    client.release()
  }
});
