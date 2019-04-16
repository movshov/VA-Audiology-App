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
const db = require('./connectDB.js');

const factory = require('./users.js')

const asyncMiddleware = fn =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .catch(next);
  };

app.get('/THEusers', asyncMiddleware(async (req, res, next) => {
    const user = await db.query('SELECT * FROM patient', null);
    res.json(user.rows);
}))

app.get('/users', require('./users.js'))

app.get('/', require('./index.js'))

// Set app to listen on a given port
app.listen(port, () => {
    console.log(`Starting VA App on port ${port}.`)
})
