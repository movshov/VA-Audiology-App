//
// Main entrypoint for traffic to our webserver.
//
//

// Imports
const express = require('express')
const bodyParser = require('body-parser')

// Globals
const app = express() //Creates express app object
const port = 3333


app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

// GET endpoint for the root
app.get('/', require('./index.ts'))

// GET endpoint for getting patient Appointment by ID
app.get('/appointment/:id',require('./getAppointment.ts'))

// Set app to listen on a given port
app.listen(port, () => {
    console.log(`Starting VA App on port ${port}.`)
})
