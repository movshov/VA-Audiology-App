//
// Main entrypoint for traffic to our webserver.
//
//

// Imports
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import * as account from './account'
import * as appointment from './appointment'
import * as patient from './patient'

// Globals
const app = express(); // Creates express app object
const port = 3333;

app.use(cors());
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

import heartbeatEndpoint from './heartbeat';
app.get('/heartbeat', heartbeatEndpoint);
import loginEndpoint from './login';
app.post('/login', loginEndpoint);
import changePasswordEndpoint from './account/password/change';
app.post('/changePassword', changePasswordEndpoint);

// -- ACCOUNTS --
app.get('/accounts', account.get);
app.post('/accounts/create', account.create);
app.post('/accounts/resetPassword', account.resetPassword);
app.post('/accounts/changeUsername', account.changeUsername);

// -- APPOINTMENTS --
app.get('/appointments', appointment.get);
app.post('/appointments', appointment.create);

// -- CLIENT ENDPOINTS START --

// Handles a single patient query
app.get('/patient/:patientId', patient.get);
// Handles select all patients query
app.get('/patient', patient.get);
app.post('/patient', patient.create);
app.post('/patient/*/notes', patient.updateNotes);
app.delete('/patient/:patientId', patient.delete);

// -- CLIENT ENDPOINTS END --

import indexEndpoint from './index';
app.get('/', indexEndpoint);

// Set app to listen on a given port
app.listen(port, () => {
    console.log(`Starting VA App on port ${port}.`)
})
