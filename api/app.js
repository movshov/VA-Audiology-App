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
app.get('/users', require('./users.js'))

app.get('/', require('./index.js'))

// Set app to listen on a given port
app.listen(port, () => {
    console.log(`Starting VA App on port ${port}.`)
})
