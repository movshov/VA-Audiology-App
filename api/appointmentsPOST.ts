import handler from './handler';
import db from './db';

export default handler(async (request : any) => {

  let connection = db();
  const client = await connection.connect()

  // Take data from request and build sql call from it
  // TODO: Move this data structure to it's own class
  const {
    //Sharded Values
    patientid,
    completiondate,
    completiontime,
    //TFI Survey
    tfisurveyid,
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
    thssurveyid,
    ths_sectiona,
    ths_sectionb,
    ths_sectionc,
    //TS Survey
    tssurveyid,
    ts_type
  } = request.body

  let tfisurvey_sql = "INSERT INTO tfisurvey (tfisurveyid, patientid, completiondate, completiontime, tfi_i, tfi_sc, tfi_c, tfi_si, tfi_a, tfi_r, tfi_q, tfi_e, tfi_overallscore) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)"
  let tfisurvey_values = [tfisurveyid, patientid, completiondate, completiontime, tfi_i, tfi_sc, tfi_c, tfi_si, tfi_a, tfi_r, tfi_q, tfi_e, tfi_overallscore]
  
  let thssurvey_sql = "INSERT INTO thssurvey (thssurveyid, patientid, completiondate, completiontime, ths_sectiona, ths_sectionb, ths_sectionc) VALUES ($1, $2, $3, $4, $5, $6, $7)"
  let thssurvey_values = [thssurveyid, patientid, completiondate, completiontime, ths_sectiona, ths_sectionb, ths_sectionc]
  
  let tssurvey_sql = "INSERT INTO tssurvey (tssurveyid, patientid, completiondate, completiontime, ts_type) VALUES ($1, $2, $3, $4, $5)"
  let tssurvey_values = [tssurveyid, patientid, completiondate, completiontime, ts_type]

  try {
    await client.query('BEGIN')
    connection.query(tfisurvey_sql, tfisurvey_values)
    connection.query(thssurvey_sql, thssurvey_values)
    connection.query(tssurvey_sql, tssurvey_values)
    await connection.query('COMMIT')
  } catch (error) {
    await client.query('ROLLBACK')
    throw error
  } finally {
    client.release()
  }
});
