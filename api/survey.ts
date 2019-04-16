//const handler = require('./handler.ts');

const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'VA_Trial',
  password: '8b %^#7608acL2bA9X1 808cb26eUb',
  port: 5432,
})

module.exports = handler((request : any) => {

  // Take data from request and build sql call from it
  const {
    tfisurveyid,
    patientid,
    completiondate,
    completiontime,
    tfi_i,
    tfi_sc,
    tfi_c,
    tfi_si,
    tfi_a,
    tfi_r,
    tfi_q,
    tfi_e,
    tfi_overallscore,
  } = request
  
  var tfisurvey_sql = "INSERT INTO tfisurvey (tfisurveyid, patientid, completiondate, completiontime, tfi_i, tfi_sc, tfi_c, tfi_si, tfi_a, tfi_r, tfi_q, tfi_e, tfi_overallscore) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)"

  // Insert data into tfisurvey
  pool.query(tfisurvey_sql, [tfisurveyid, patientid, completiondate, completiontime, tfi_i, tfi_sc, tfi_c, tfi_si, tfi_a, tfi_r, tfi_q, tfi_e, tfi_overallscore,] , (error : any, results : any) => {
    if (error) {
      throw error
    }
  })

  // Insert data into thssurvey

  // Insert data into tssurvey

  return 'Survey sucessfully submitted';
});
