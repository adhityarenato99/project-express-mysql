var mysql = require('mysql');

var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_test'
});

con.connect(function(err) {

    if (err) throw err;
    console.log('Koneksi berhasil!');
})

module.exports = con;