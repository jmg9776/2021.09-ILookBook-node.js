const jwt = require('jsonwebtoken');
require('dotenv').config();

function make_token(uid, time)
{
    try {
        const token = jwt.sign({
            uid,
        }, process.env.key, {
            expiresIn: time,
            issuer: process.env.svName,
        });
        return token;
    } catch (error) {
        return 'error'
    }
}

function decryption(token){
    let res
    try{
        res = jwt.verify(token, process.env.key);
    }catch (e){
        return e;
    }
}

module.exports.mktoken = make_token;
module.exports.decryption = decryption;
