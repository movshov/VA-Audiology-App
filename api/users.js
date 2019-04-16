const handler = require('./handler.js');
const { Pool, Client } = require('pg');
const db = require('./connectDB.js');

//File structure analogous to an HTTP server: (URL looking for the file: 'localhost:3000/users')
module.exports = handler((request, response) => {
    const text = 'SELECT * FROM patient'
    db.query(text, null, (err, res) => {
        if (err) {
            console.log(err.stack)
        } else {   
            console.log("Hello1?");       
            response.status(200).json({
                "status": "success",
                "data": res.rows
            })
        }
    })
})
