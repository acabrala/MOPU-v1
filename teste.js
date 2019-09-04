const { Pool, Client } = require('pg');
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'mobilidade',
    password: 'MKTz@zz1',
    port: 5432
});

pool.query('Select * from usuario', (err, res) => {
    console.log(err, res.rows)
    pool.end()
})