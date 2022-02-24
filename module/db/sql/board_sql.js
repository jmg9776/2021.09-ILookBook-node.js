const db = require('../controller');

function mdUpload(name, price, img, text, stock, like, callback){
    if (price != undefined)
    {
        let query = "insert into lookbook.lookbook_md_t " +
            "(md_name, md_price, md_img, md_text, md_stock, md_like) " +
            "values ($0,$1,$2,$3,$4,$5)"

        query = db.sqlBuilder(query,[name, price, img, text, stock, like]);

        db.ExcuteQuery(query,[],function (err, data){
            return;
        });
    }
}

function mdGet(id, callback){
    let query = "select * from lookbook.lookbook_md_t where md_code=$0";
    query = db.sqlBuilder(query, [id]);

    db.ExcuteQuery(query, [], function (err, data){
        return callback(err, data);
    });
}

function mdListGet(callback){
    const query = "select md_code, md_name, md_img, md_price from lookbook.lookbook_md_t";
    db.ExcuteQuery(query, [], function (err, data){
        return callback(err, data);
    });
}

module.exports.mdUp = mdUpload;
module.exports.mdGet = mdGet;
module.exports.mdListGet = mdListGet;
