import handler from '../handler';
import withConnection from '../db';
import * as auth from '../authenticate';
import * as errors from '../errors';
import { Client } from 'pg';
import { AccountCreateResponse } from '../../api-objects/accountCreateResponse';
import { UsersObject } from '../../api-objects/UsersObject';

// Expects 'username', 'authorityName', and 'authorityType'
// Returns the created account and the randomly generated password
export default handler(async (req, userId): Promise<AccountCreateResponse> => {
    errors.requireParams(req.body, ['user', 'adminPassword']);
    const user: UsersObject = req.body.user;
    errors.requireParams(user, ['username', 'name', 'authorityType']);
    const username = user.username;
    const authorityName = user.name;
    const authorityType = user.authorityType;
    return withConnection(async (db: Client) => {
        if (! await auth.matchesPassword(db, userId, req.body.adminPassword)) {
            throw new errors.BadParameter("Your password does not match.");
        }
        const matchingAccount = await db.query('SELECT username FROM authority WHERE username = $1', [username]);
        if (matchingAccount.rows.length !== 0) {
            throw new errors.DuplicateInsertion('An account with username ' + username + ' already exists.');
        }
        const password = auth.randomPassword();
        const hash = await auth.hash(password);
        const createdAccount = await db.query('INSERT INTO authority (username, password, authorityname, authoritytype) VALUES ($1, $2, $3, $4) RETURNING authorityid', [username, hash, authorityName, authorityType]);
        if (createdAccount.rows.length !== 1) {
            throw new errors.APIError('Somehow failed to create New Account' + userId);
        }
        return {
            authorityId: createdAccount.rows[0].authorityid,
            username,
            authorityName,
            authorityType,
            password,
        };
    });
}, auth.mustBeAdmin);
