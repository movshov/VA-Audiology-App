const { Client } = require('pg')
const client = new Client({
	host: 'localhost',
	port: 3333,
	database: 'va_trial',
	user: 'postgres',
	password: '',
})

// Establish a connection
client.connect()
  .then(() => console.log('Connected!'))
  .catch(e => console.error('Connection Error!',e.stack))

module.exports = client;