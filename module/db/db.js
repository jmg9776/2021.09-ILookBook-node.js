const mysql = require('mysql');
const config = require('./config');

const pool = mysql.createPool(config);

pool.on('acquire', function (connection){
    console.log('Connection %d acquired', connection.threadId);
});

const getConn = function (callback){
    pool.getConnection(function (err, connection){
        callback(err, connection);
    })
}

module.exports = getConn;