const express = require('express');
const router = express.Router();
require('dotenv').config();

const db = require('../middleware/db/user_api');

const token = require('../middleware/token/token');
const { verifyToken } = require('../middleware/token/jwt');
module.exports = router;

router.get('/test',async (req, res) => {
    const tk = req.query.token;
    db.rfcheck(tk,function (err,data){
        if(data[0].res!=0){
            const uid = token.decryption(tk).uid;
            res.json({message:"success", accessToken: token.mktoken(uid, process.env.accessToken)});
        }else
        {
            res.json({message:"error", accessToken: 'Invalid token'});
        }
    });
});

router.get('/refresh', verifyToken, async (req, res) => {
    const tk = req.headers.authorization;
    db.rfcheck(tk,function (err,data){
        if(data[0].res!=0){
            const uid = token.decryption(tk).uid;
            res.json({message:"success", accessToken: token.mktoken(uid, process.env.accessToken)});
        }else
        {
            res.json({message:"error", accessToken: 'Invalid token'});
        }
    });
});

router.get('/login', async (req, res) => {
    const id = req.query.id;
    const pw = req.query.pw;
    let uid;

    if (id != undefined && pw != undefined
        && id != null && pw != null){
        db.loginCheck(id,pw,function (err,data) {
            try{
                uid = data[0].user_code;
            }catch(e){}
            if (uid!=undefined){
                const tk = token.lgToken(uid);
                db.logtokenInsert(tk.refreshToken,function (err,data){
                    res.json({message:"success",accessToken:tk.accessToken, refreshToken:tk.refreshToken});
                });
            }
            else{
                res.json({message: 'fail'});
            }
        });
    }
    else{
        res.json()
    }
});
