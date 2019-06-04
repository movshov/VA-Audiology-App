//
// Main entrypoint for traffic to our webserver.
//
//

// Imports
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import fs from 'fs';
import https from 'https';

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
import changePasswordEndpoint from './changePassword';
app.post('/changePassword', changePasswordEndpoint);

// -- ACCOUNTS --
import accountsGetEndpoint from './accountsGET';
app.get('/accounts', accountsGetEndpoint);
import accountCreate from './accounts/create';
app.post('/accounts/create', accountCreate);
import resetPassword from './accounts/resetPassword';
app.post('/accounts/resetPassword', resetPassword);

import changeUsername from './accounts/changeUsername';
app.post('/accounts/changeUsername', changeUsername);

import appointmentsEndpoint from './appointments';
import appointmentsPostEndpoint from './appointmentsPOST';
app.get('/appointments', appointmentsEndpoint);
app.post('/appointments', appointmentsPostEndpoint);


import patientGet from './patient/get';
// Handles a single patient query
app.get('/patient/:patientId', patientGet);
// Handles select all patients query
app.get('/patient', patientGet);

import patientPost from './patient/create';
app.post('/patient', patientPost);

import patientUpdateNotes from './patient/updateNotes';
app.post('/patient/*/notes', patientUpdateNotes);

import patientDelete from './patient/delete';
app.delete('/patient/:patientId', patientDelete);


import indexEndpoint from './index';
app.get('/', indexEndpoint);


// SSL Certificate
const privateKey = fs.readFileSync('../cert/server.key', 'utf8');
const certificate = fs.readFileSync('../cert/server.crt', 'utf8');

const credentials = {key: privateKey, cert: certificate};

// Set app to listen on a given port
const server = https.createServer(credentials, app);
server.listen(port, () => {
    console.log(`Starting VA App on port ${port}.`)
})
