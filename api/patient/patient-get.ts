import handler from '../handler';
import withConnection from '../db';
import * as auth from '../authenticate';
import * as errors from '../errors';
import { Client } from 'pg';
import { QueryResult } from 'pg';


// Expects notes string
// Returns the created account (NOT including the created Password)
export default handler(async (req, userId) => {
    let notes: string = req.body.notes;
    let patientId = req.params[0];
    return withConnection(async (db: Client) => {
        let results: QueryResult;

        if(!patientId){
            results = await db.query('SELECT * FROM patient');
        } else {
            results = await db.query('SELECT * FROM patient WHERE patient.patientid = $1', [patientId]);
        }
        return results.rows;

    });
}, auth.alwaysPermitted);