const { Client } = require('pg')
const client = new Client({
	user: 'postgres',
	host: 'localhost',
	database: 'va_trial',
	password: 'Meshal090909',
	port: 5432,
})

// Establish a connection
client.connect()
  .then(() => console.log('Connected!'))
  .catch(e => console.error('Connection Error!'))

module.exports = client;