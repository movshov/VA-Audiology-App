import handler from '../handler';
import withConnection from '../db';
import * as auth from '../authenticate';
import * as errors from '../errors';
import { Client } from 'pg';

// Expects 'username'
// Returns the randomly generated password
export default handler(async (req, userId): Promise<string> => {
    errors.requireParams(req.body, ['username','newusername'],);
    const username = req.body.username;
    const newname = req.body.newusername;
    return withConnection(async (db: Client) => {
        const matchingAccount = await db.query('SELECT username FROM authority WHERE username = $1', [username]);
        if (matchingAccount.rows.length !== 1) {
            throw new errors.BadParameter('No such account with username ' + username);
        }
        await db.query('UPDATE authority SET username = $1 WHERE username = $2', [newname, username]);
        return newname;
    });
}, auth.authenticate);