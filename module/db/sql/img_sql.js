const db = require('../controller');

function taskUpdate(target, img, callback){
    let query = "select count(*) from lookbook.lookbook_tasks_t where user_code=$0 and md_code=$1"
    query = db.sqlBuilder(query,  [target, img])
    db.ExcuteQuery(query, [], function (err, data){
        if(data[0]["count(*)"]==0){
            query = "insert into lookbook.lookbook_tasks_t (user_code, md_code , res) " +
                "values ($0, $1, '')"
            query = db.sqlBuilder(query,  [target, img])

            db.ExcuteQuery(query, [], function (err, data){
                return callback(err, 'success')
            })
        }
        else {return callback(err, 'already')}
    })
}

function resUpdate(fileName, target, callback){
    let query = "update lookbook.lookbook_tasks_t set res=$0 where task_code=$1";
    if (fileName!=undefined){
        query = db.sqlBuilder(query,[fileName, target]);
        db.ExcuteQuery(query,[],function (err, data){
            return callback(err,data);
        });
    }
}

function profileUpdate(fileName, target, callback){
    let query = "update lookbook.lookbook_accounts_t set user_pf_img=$0 where user_code=$1";
    query = db.sqlBuilder(query,[fileName, target]);

    db.ExcuteQuery(query,[],function (err, data){
        return callback(err,data);
    });
}

function profileGet(target, callback) {
    let query = "SELECT user_pf_img from lookbook.lookbook_accounts_t where user_code=$0"
    query = db.sqlBuilder(query, [target])

    db.ExcuteQuery(query, [], function (err,data){
        return callback(err,data);
    });
}

function getTask(callback) {
    let query = "SELECT * from lookbook.lookbook_tasks_v"

    db.ExcuteQuery(query, [], function (err,data){
        return callback(err,data);
    });
}

function getRes(user_code, md_code, callback) {
    let query = "select res from lookbook.lookbook_tasks_t where user_code=$0 and md_code=$1"
    query = db.sqlBuilder(query, [user_code, md_code])

    db.ExcuteQuery(query, [], function (err,data){
        return callback(err,data);
    });
}

module.exports.getRes = getRes;
module.exports.rUpdate = resUpdate;
module.exports.pfUp = profileUpdate;
module.exports.pfGet = profileGet;
module.exports.getTask = getTask;
module.exports.taskUpdate = taskUpdate;
