// Imports
const client = require('./dbclientconfig.js')


// Gets Appointment information by ID
function getAppointment(request,response) {

	// Get the appointment ID from the request
	const aptID = parseInt(request.params.id)
	client.query('SELECT * FROM appointments WHERE appointmentid=$1',[ aptID ], (error,result) => {
		if(error) {
			console.log('ERROR:',error)
		} 
		response.status(200).json(result.rows[0])
		
	})
	client.end()
}

module.exports = getAppointment;