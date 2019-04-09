const handler = require('./handler.js');
var pgp = require('pg-promise')(/*options*/)
var db = pgp('postgres://username:password@host:port/database')

module.exports = handler((request) => {
    //Placeholder for SQL code (Currently blocked)
    return db.each('SELECT id, code, name FROM appointments', [], row => {
        row.code = parseInt(row.code);
    })
        .then(data => {
            // data = array of events, with 'code' converted into integer
        })
        .catch(error => {
            // error
        });
});
