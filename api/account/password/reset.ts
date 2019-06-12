import handler from '../../handler';
import withConnection from '../../db';
import * as auth from '../../authenticate';
import * as errors from '../../errors';
import { Client } from 'pg';

// Expects 'username'
// Returns the randomly generated password
export default handler(async (req, userId): Promise<string> => {
    errors.requireParams(req.body, ['username', 'adminPassword']);
    const username = req.body.username;
    return withConnection(async (db: Client) => {
        if (! await auth.matchesPassword(db, userId, req.body.adminPassword)) {
            throw new errors.BadParameter("Your password does not match.");
        }
        const matchingAccount = await db.query('SELECT username FROM authority WHERE username = $1', [username]);
        if (matchingAccount.rows.length !== 1) {
            throw new errors.BadParameter('No such account with username ' + username);
        }
        const password = auth.randomPassword();
        const hash = await auth.hash(password);
        await db.query('UPDATE authority SET password = $1 WHERE username = $2', [hash, username]);
        return password;
    });
}, auth.mustBeAdmin);
