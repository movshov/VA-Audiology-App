import handler from './handler';

const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'VA_Trial',
  password: 'Derp',
  port: 5432,
})

export default handler((request : any) => {
  
  console.log("Whole Request\n\n")
  console.log(request)
  console.log("\n\nEnd Whole Request") 

  console.log("Request Body\n\n")
  console.log(request.body)
  console.log("\n\nEnd Request Body")

  console.log("Request Data\n\n")
  console.log(request.data)
  console.log("\n\nEnd Request Data")  

  // Take data from request and build sql call from it
  // TODO: Condenence this to something not ugly
  var tfisurveyid = request.body.tfisurveyid
  var patientid = request.body.patientid
  var completiondate = request.body.completiondate
  var completiontime = request.body.completiontime
  var tfi_i = request.body.tfi_i
  var tfi_sc = request.body.tfi_sc
  var tfi_c = request.body.tfi_c
  var tfi_si = request.body.tfi_si
  var tfi_a = request.body.tfi_a
  var tfi_r = request.body.tfi_r
  var tfi_q = request.body.tfi_q
  var tfi_e = request.body.tfi_e
  var tfi_overallscore = request.body.tfi_overallscore
  
  var tfisurvey_sql = "INSERT INTO tfisurvey (tfisurveyid, patientid, completiondate, completiontime, tfi_i, tfi_sc, tfi_c, tfi_si, tfi_a, tfi_r, tfi_q, tfi_e, tfi_overallscore) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)"

  // Insert data into tfisurvey
  pool.query(tfisurvey_sql, [tfisurveyid, 7, "25-MAY-2018", "2018-05-26 14:47:57.62", 7, 7, 7, 7, 7, 7, 7, 7, 7,] , (error : any, results : any) => {
    if (error) {
      throw error
    }
  })

  // Insert data into thssurvey

  // Insert data into tssurvey

  return 'Survey sucessfully submitted';
});
