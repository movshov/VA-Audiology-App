import handler from './handler';
import withConnection from './db';
import * as auth from './authenticate';
import * as errors from './errors';
import { Client } from 'pg';

// Expects oldPassword and newPassword
// Returns user and new session
// This logs out all existing sessions; you must change your saved session id to this new id
export default handler(async (req, userId) => {
    errors.requireParams(req.body, ['oldPassword', 'newPassword']);
    return withConnection(async (db: Client) => {
        if (! await auth.matchesPassword(db, userId, req.body.oldPassword)) {
            throw new errors.BadParameter("Old password does not match.");
        }

        await auth.setPassword(db, userId, req.body.newPassword);
        await auth.clearAllKeys(db, userId);
        const sessionId = await auth.beginSession(db, userId);

        return {
            user: userId,
            session: sessionId,
        };
    });
}, auth.authenticate);
