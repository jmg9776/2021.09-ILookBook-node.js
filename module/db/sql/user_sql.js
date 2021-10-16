const db = require('../controller');

function refresh_check(token, callback){
    let query = 'select count(*) as res from ' + process.env.token + ' ' +
        'where token=$0';
    query = db.sqlBuilder(query,[token]);

    db.ExcuteQuery(query,[],function (err, data){
        return callback(err,data);
    });
}

function login_Token_Insert(token, callback) {
    let query = 'insert into ' + process.env.token + ' values (?, now())';
    db.ExcuteQuery(query, [token], function (err,data){
        return callback(err,data);
    });
}

function loginCheck(id, pw, callback) {
    let query = 'select user_code from ' + process.env.account + ' ' +
        'where user_id=$0 and user_pw=$1';
    query = db.sqlBuilder(query,[id,pw]);

    db.ExcuteQuery(query, [], function (err,data){
        return callback(err,data);
    })
}

function createAccount(id, pw, email) {
    let query = "insert INTO lookbook.lookbook_accounts_t (user_id, user_pw, user_email) " +
        "VALUES($0, $1, $2)";
    query = db.sqlBuilder(query,[id,pw,email]);

    db.ExcuteQuery(query, [], function (err,data){
        return;
    })
}

module.exports.crAccount = createAccount;
module.exports.logtokenInsert = login_Token_Insert;
module.exports.loginCheck = loginCheck;
module.exports.rfcheck = refresh_check;
