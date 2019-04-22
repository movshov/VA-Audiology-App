import handler from './handler';

const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'VA_Trial',
  password: '{{ redacted }}',
  port: 5432,
})

export default handler((request : any) => {
  // Take data from request and build sql call from it
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

  // Insert data into tfisurvey
  var tfisurvey_sql = "INSERT INTO tfisurvey (tfisurveyid, patientid, completiondate, completiontime, tfi_i, tfi_sc, tfi_c, tfi_si, tfi_a, tfi_r, tfi_q, tfi_e, tfi_overallscore) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)"
  
  pool.query(tfisurvey_sql, [tfisurveyid, patientid, completiondate, completiontime, tfi_i, tfi_sc, tfi_c, tfi_si, tfi_a, tfi_r, tfi_q, tfi_e, tfi_overallscore] , (error : any, results : any) => {
    if (error) {
      throw error
    }
  })

  // Insert data into thssurvey
  var thssurvey_sql = "INSERT INTO thssurvey (thssurveyid, patientid, completiondate, completiontime, ths_sectiona, ths_sectionb, ths_sectionc) VALUES ($1, $2, $3, $4, $5, $6, $7)"

  pool.query(thssurvey_sql, [thssurveyid, patientid, completiondate, completiontime, ths_sectiona, ths_sectionb, ths_sectionc] , (error : any, results : any) => {
    if (error) {
      throw error
    }
  })

  // Insert data into tssurvey
  var tssurvey_sql = "INSERT INTO tssurvey (tssurveyid, patientid, completiondate, completiontime, ts_type) VALUES ($1, $2, $3, $4, $5)"

  pool.query(tssurvey_sql, [tssurveyid, patientid, completiondate, completiontime, ts_type] , (error : any, results : any) => {
    if (error) {
      throw error
    }
  })

  return 'Survey sucessfully submitted';
});
