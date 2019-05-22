import handler from '../handler';
import withConnection from '../db';
import * as auth from '../authenticate';
import * as errors from '../errors';
import { Client } from 'pg';


// Expects patientId
// Returns null value
export default handler(async (req, userId) => {
    return withConnection(async (db: Client) => {
        let deleteResults = await db.query('DELETE FROM authority WHERE authority.username = $1', [req.params.accountId]);
        if(deleteResults.rowCount === 0) {
            throw new errors.BadParameter('Delete failed, This patient does not exist');
        }
    });
}, auth.mustBeAdmin);
