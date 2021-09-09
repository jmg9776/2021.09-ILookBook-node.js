const jwt = require('jsonwebtoken');
require('dotenv').config();

function login_token(uid){
    let act = make_token(uid,process.env.accessToken);
    let rft = make_token(uid,process.env.refreshToken);

    const res = {
        message: 'success',
        accessToken: act,
        refreshToken: rft
    }
    return res;
}

function make_token(uid, time) {
    try {
        const token = jwt.sign({
            uid,
        }, process.env.key, {
            expiresIn: time,
            issuer: process.env.svName,
        });
        return token;
    } catch (error) {
        return 'error';
    }
}

function decryption(token){
    let res;
    try{
        res = jwt.verify(token, process.env.key);
        return res;
    }catch (e){
        return e;
    }
}

module.exports.mktoken = make_token;
module.exports.decryption = decryption;
module.exports.lgToken = login_token;
