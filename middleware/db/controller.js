const db = require('./db');

function ExecuteQuery(q, value, callback){
    try{
        db((err,connection)=> {
            connection.query(q, value, (err,rows)=>{
                connection.release();
                if(err){
                    throw err;
                }
                return callback(err,rows);
            });
        })
    } catch (e){
        return callback(e,null);
    }
}

module.exports.ExcuteQuery = ExecuteQuery;
