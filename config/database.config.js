const { Pool, Client } = require("pg");

    // Connect with a connection pool. 
    const pool = new Pool({
        user: process.env.PGUSER,
        host: process.env.PGHOST,
        database: process.env.PGDATABASE,
        password: process.env.PGPASSWORD,
        port: process.env.PGPORT,
    })

    pool.query('SELECT NOW()', (err, result) => {
        if(!err){
            console.log('connected to postgres database successfully!!', result.rows[0])
        } else {
            console.log(err)
        }
    })

module.exports = pool;