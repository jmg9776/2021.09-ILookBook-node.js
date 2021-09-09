const db = require('./db');

function sqlBuilder(sql, data){
    let i;
    for (i=0;i<data.length;i++){
        sql = sql.replace('$'+i.toString(), JSON.stringify(data[i]));
    }
    return sql;
}

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
module.exports.sqlBuilder = sqlBuilder;
