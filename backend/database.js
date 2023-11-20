const {createPool} = require('mysql')

const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: 'root123',
    database: 'melodiaja'
})

pool.query(`Select * from melodiaja.pengguna`, (err, res)=>{
    return console.log(res)
})