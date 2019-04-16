const { Pool, Client } = require('pg')

//TODO: Convert client into pool.
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'va_trial',
    password: 'postgres',
    port: 5432,
});
client.connect();

module.exports = {
    query: (text, params, callback) => {
        return client.query(text, params, callback)
    }
}