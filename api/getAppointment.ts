// Imports
const client = require('./dbclientconfig.js');
const handler = require('./handler.ts');



module.exports = handler((request,response) => {

		// Get the appointment ID from the request
		const aptID = parseInt(request.params.id);
		client.query('SELECT * FROM appointments WHERE appointmentid=$1',[ aptID ], (error,result) => {
			if(error) {
				console.log('ERROR:',error);
			} else {
				  response.status(200).json({
				  	"status": "success",
				  	"data": result.rows
				  });
			}
		
		});
	
});