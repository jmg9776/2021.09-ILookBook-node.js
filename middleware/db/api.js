const db = require('./controller');
const config = require('./config');

function sqlBuilder(sql, data){
    let i;
    for (i=0;i<data.length;i++){
        sql = sql.replace('$'+i.toString(), JSON.stringify(data[i]));
    }
    return sql;
}

function refresh_check(token, callback){
    let query = 'select count(*) as res from lostark.lostark_ref_token_t ' +
        'where token=$0';
    query = sqlBuilder(query,[token]);

    db.ExcuteQuery(query,[],function (err, data){
        return callback(err,data);
    });
}

function login_Token_Insert(token, callback) {
    let query = 'insert into lostark.lostark_ref_token_t values (?, now())';
    db.ExcuteQuery(query, [token], function (err,data){
        return callback(err,data);
    });
}

function loginCheck(id, pw, callback) {
    let query = 'select user_code from lostark.lostark_accounts_t ' +
        'where user_id=$0 and user_pw=$1';
    query = sqlBuilder(query,[id,pw]);

    db.ExcuteQuery(query, [], function (err,data){
        return callback(err,data);
    })
}

module.exports.logtokenInsert = login_Token_Insert;
module.exports.loginCheck = loginCheck;
module.exports.rfcheck = refresh_check;
